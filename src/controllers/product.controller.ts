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
        all: data.all,
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

  @MessagePattern({ cmd: 'load-products' })
  loadProducts(payload: any) {
    const response =  this.productService.loadProducts(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        products: data.products,
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