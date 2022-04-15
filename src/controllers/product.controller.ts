import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ProductService } from '@services';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'load-unmapped-products' })
  loadUnmappedProducts(payload: any) {
    const response =  this.productService.loadUnmappedProducts(payload);
    return response.then(({ data: {products, count} }) => {
      return { status: HttpStatus.OK, products, count };
    })
    .catch(err => {
      throw new RpcException({ error: { status: err.response.status, message: err.response.data }});
    });
  }

  @MessagePattern({ cmd: 'load-shopee-v2-products' })
  loadShopeeV2Products(payload: any) {
    const response =  this.productService.loadShopeeV2Products(payload)
    return response.then(({ data: {data: {hasNextPage, limit, nextOffset, total, products}} }) => {
      return {status: HttpStatus.OK, hasNextPage, limit, nextOffset, total, products}
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

  @MessagePattern({ cmd: 'load-product-summary' })
  loadProductSummary(payload: any) {
    const response =  this.productService.loadProductSummary(payload)
    return response.then(({ data: {summary} }) => {
      return {status: HttpStatus.OK, summary}
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

  @MessagePattern({ cmd: 'mapping-products' })
  mappingProducts(payload: any) {
    const response =  this.productService.mappingProducts(payload);
    return response.then(({ data: {message} }) => {
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

  @MessagePattern({ cmd: 'load-products' })
  loadProducts(payload: any) {
    const response =  this.productService.loadProducts(payload);
    return response.then(({ data: {products, total} }) => {
      return {
        status: HttpStatus.OK,
        products,
        total,
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