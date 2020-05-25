import { Controller, HttpStatus } from '@nestjs/common';
import { OrderService } from '@services';
import { RpcException, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'save-order'})
  saveOrder(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const response =  this.orderService.saveOrder(payload);
    channel.ack(message);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        data: data.order,
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

  @MessagePattern({ cmd: 'orders' })
  loadOrders(payload: any) {
    const response =  this.orderService.loadOrders(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        orders: data.orders,
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

  @MessagePattern({ cmd: 'order-total' })
  loadTotalOrderTotalPage(payload: any) {
    const response =  this.orderService.loadTotalOrderTotalPage(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        total: data.total,
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

  @MessagePattern({ cmd: 'order-status' })
  loadOrderStatus(payload: any) {
    const response =  this.orderService.loadOrderStatus(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        list: data.list,
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

  @MessagePattern({ cmd: 'order-locked' })
  loadOrderLocked(payload: any) {
    const response =  this.orderService.loadOrderLocked(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        locked: data.locked,
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