import { Controller, HttpStatus } from '@nestjs/common';
import { StockService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @MessagePattern({ cmd: 'load-stocks' })
  loadStocks(payload: any) {
    const response =  this.stockService.loadStocks(payload);
    return response.then(({ data: { stocks } }) => {
      return {
        status: HttpStatus.OK,
        stocks,
      };
    })
    .catch(({ response: { status, data}}) => {
      throw new RpcException({
        error: {
          status,
          message: data,
        },
      });
    });
  }
}