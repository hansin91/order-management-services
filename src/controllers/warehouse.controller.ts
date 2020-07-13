import { Controller, HttpStatus } from '@nestjs/common';
import { LocationService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class WarehouseController {
  constructor(private readonly warehouseService: LocationService) {}

  @MessagePattern({ cmd: 'load-warehouses' })
  loadStores(payload: any) {
    const response =  this.warehouseService.loadWarehouses(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        warehouses: data.warehouses,
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