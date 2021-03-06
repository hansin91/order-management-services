import * as jwt from 'jsonwebtoken';
import { Controller, HttpStatus } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { UploadedOrderService } from '@services';

@Controller()
export class UploadedOrderController {
  constructor(private readonly uploadedOrderService: UploadedOrderService) {}

  @MessagePattern({ cmd: 'create-uploaded-orders'})
  createUploadedOrders(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    let response =  this.uploadedOrderService.createUploadedOrders(payload);
    return response.then(({ data: {file} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        file,
      };
    })
    .catch(err => {
      const errorMessage = err.response.data;
      if (errorMessage.trim() === 'Please login first') {
        const {body: {file: {modifiedUser}} } = payload;
        const payloadData = {
          id: modifiedUser.id,
          email: modifiedUser ? (modifiedUser.email ? modifiedUser.email : '') : '',
          username: modifiedUser ? modifiedUser.username : 'master12345',
        };
        const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' });
        payload.token = token;
        response = this.uploadedOrderService.createUploadedOrders(payload);
        return response.then(({ data: {file} }) => {
          channel.ack(message);
          return {
            status: HttpStatus.OK,
            file,
          };
        });
      } else {
        throw new RpcException({
          error: { status: err.response.status, message: err.response.data },
        });
      }
    });
  }
}
