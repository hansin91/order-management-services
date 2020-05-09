import { Controller, HttpStatus } from '@nestjs/common';
import { OrderService } from '@services';
import { RpcException, MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'order-shippings' })
  loadOrderShippings(payload: any) {
    const response =  this.orderService.loadOrderShippings(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        shippings: data.shippings,
      };
    })
    .catch(err => {
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }
}