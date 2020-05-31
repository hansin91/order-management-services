import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ProductService } from '@services';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'load-product-summary' })
  loadProductSummary(payload: any) {
    const response =  this.productService.loadProductSummary(payload);
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