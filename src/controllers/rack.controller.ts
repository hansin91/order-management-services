import { Controller, HttpStatus } from '@nestjs/common';
import { LocationService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class RackController {
  constructor(private readonly rackService: LocationService) {}

  @MessagePattern({ cmd: 'delete-rack' })
  deleteRack(payload: any) {
    const response =  this.rackService.deleteRack(payload);
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

  @MessagePattern({ cmd: 'create-rack' })
  createRack(payload: any) {
    const response =  this.rackService.createRack(payload);
    return response.then(({ data: { message, newRack } }) => {
      return {
        status: HttpStatus.OK,
        message,
        rack: newRack,
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

  @MessagePattern({ cmd: 'load-racks' })
  loadRacks(payload: any) {
    const response =  this.rackService.loadRacks(payload);
    return response.then(({ data: { racks } }) => {
      return {
        status: HttpStatus.OK,
        racks,
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