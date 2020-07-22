import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException, Payload, Ctx, RmqContext } from '@nestjs/microservices';
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

  @MessagePattern({ cmd: 'set-product-group' })
  setProductGroup(payload: any) {
    const response =  this.productService.setProductGroup(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        message: data.message,
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

  @MessagePattern({ cmd: 'load-products' })
  loadProducts(payload: any) {
    const response =  this.productService.loadProducts(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        products: data.products,
        total: data.total,
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

  @MessagePattern({ cmd: 'load-product-detail' })
  loadProductDetail(payload: any) {
    const response =  this.productService.loadProductDetail(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        product: data.product,
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

  @MessagePattern({ cmd: 'edit-product-store' })
  editProductStore(payload: any) {
    const response =  this.productService.editProductStore(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        product: data.product,
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

  @MessagePattern({ cmd: 'edit-product'})
  editProduct(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const response =  this.productService.editProduct(payload);
    channel.ack(message);
    return response.then(({ data: {product} }) => {
      return {
        status: HttpStatus.OK,
        product,
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

  @MessagePattern({ cmd: 'create-product-store' })
  createProductStore(payload: any) {
    const response =  this.productService.createProductStore(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        product: data.product,
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

  @MessagePattern({ cmd: 'load-product-stores' })
  loadProductStores(payload: any) {
    const response =  this.productService.loadProductStores(payload);
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