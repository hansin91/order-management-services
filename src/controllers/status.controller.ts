import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { StatusService } from '@services';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @MessagePattern({ cmd: 'load-status' })
  loadStatus(payload: any) {
    const response =  this.statusService.loadStatus(payload);
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

  @MessagePattern({ cmd: 'load-status-summary' })
  loadStatusSummary(payload: any) {
    const response =  this.statusService.loadStatusSummary(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        summary: data.summary,
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