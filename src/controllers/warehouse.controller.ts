import { Controller, HttpStatus } from '@nestjs/common';
import { LocationService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class WarehouseController {
  constructor(private readonly warehouseService: LocationService) {}

  @MessagePattern({ cmd: 'delete-warehouse' })
  deleteWarehouse(payload: any) {
    const response =  this.warehouseService.deleteWarehouse(payload);
    return response.then(({ data: { message } }) => {
      return {
        status: HttpStatus.OK,
        message,
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
  loadWarehouses(payload: any) {
    const response =  this.warehouseService.loadWarehouses(payload);
    return response.then(({ data: { warehouses } }) => {
      return {
        status: HttpStatus.OK,
        warehouses,
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