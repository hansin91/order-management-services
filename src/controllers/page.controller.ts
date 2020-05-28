import { Controller, HttpStatus } from '@nestjs/common';
import { PageService } from '@services';
import { RpcException, MessagePattern } from '@nestjs/microservices';

@Controller()
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @MessagePattern({ cmd: 'lock-date' })
  lockDate(payload: any) {
    const response =  this.pageService.lockDate(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        date: data.date,
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