import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ShippingService } from '@services';

@Controller()
export class ShippingController {
  constructor(private readonly shippingservice: ShippingService) {}

  @MessagePattern({ cmd: 'load-shippings' })
  loadShippings(payload: any) {
    const response =  this.shippingservice.loadShippings(payload);
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

  @MessagePattern({ cmd: 'load-shipping-orders' })
  loadShippingOrders(payload: any) {
    const response =  this.shippingservice.loadShippingOrders(payload);
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

  @MessagePattern({ cmd: 'load-shipping-summary' })
  loadStatusSummary(payload: any) {
    const response =  this.shippingservice.loadShippingSummary(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        data: data.data,
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