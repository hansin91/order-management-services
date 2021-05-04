import * as jwt from 'jsonwebtoken';
import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { UploadedOrderService } from '@services';

@Controller()
export class UploadedOrderController {
  private logger: Logger;
  constructor(private readonly uploadedOrderService: UploadedOrderService) {
    this.logger = new Logger();
  }

  @EventPattern('create-uploaded-orders')
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
      this.logger.log(err.response.data);
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
