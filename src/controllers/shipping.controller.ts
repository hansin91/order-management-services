import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ShippingService } from '@services';

@Controller()
export class ShippingController {
  constructor(private readonly shippingservice: ShippingService) {}

  @MessagePattern({ cmd: 'load-shippings' })
  loadShippings(payload: any) {
    const response =  this.shippingservice.loadShippings(payload);
    return response.then(({ data: {shippings} }) => {
      return {status: HttpStatus.OK, shippings};
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

  @MessagePattern({ cmd: 'load-shipping-orders' })
  loadShippingOrders(payload: any) {
    const response =  this.shippingservice.loadShippingOrders(payload);
    return response.then(({ data: {shippings, trackings} }) => {
      return {status: HttpStatus.OK, shippings, trackings};
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

  @MessagePattern({ cmd: 'load-shopee-shippings' })
  loadShopeeShippings(payload: any) {
    const response =  this.shippingservice.loadShopeeShippings(payload);
    return response.then(({ data: {logistics} }) => {
      return {status: HttpStatus.OK, shippings: logistics};
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

  @MessagePattern({cmd: 'load-shipping-message'})
  loadShippingMessage(payload: any) {
    const response =  this.shippingservice.loadShippingMessage(payload);
    return response.then(({ data: {message} }) => {
      return {status: HttpStatus.OK, message};
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