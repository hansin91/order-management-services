import { Controller, HttpStatus } from '@nestjs/common';
import { LocationService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class WarehouseController {
  constructor(private readonly warehouseService: LocationService) {}

  @MessagePattern({ cmd: 'create-warehouse' })
  createWarehouse(payload: any) {
    const response =  this.warehouseService.createWarehouse(payload);
    return response.then(({ data: { message, newWarehouse } }) => {
      return {
        status: HttpStatus.OK,
        message,
        warehouse: newWarehouse,
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