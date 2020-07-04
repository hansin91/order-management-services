import { Controller, HttpStatus } from '@nestjs/common';
import { StoreService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @MessagePattern({ cmd: 'store-shippings' })
  loadStatusSummary(payload: any) {
    const response =  this.storeService.loadStoreShippings(payload);
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

  @MessagePattern({ cmd: 'load-stores' })
  loadStores(payload: any) {
    const response =  this.storeService.loadStores(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        stores: data.stores,
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