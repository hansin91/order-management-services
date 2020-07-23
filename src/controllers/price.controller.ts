import { Controller, HttpStatus } from '@nestjs/common';
import { PriceService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @MessagePattern({ cmd: 'load-prices' })
  loadPrices(payload: any) {
    const response =  this.priceService.loadPrices(payload);
    return response.then(({ data: { prices } }) => {
      return {
        status: HttpStatus.OK,
        prices,
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