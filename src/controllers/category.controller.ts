import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CategoryService, ShopeeService } from '@services';

@Controller()
export class CategoryController {
  constructor(
    private readonly shopeeService: ShopeeService,
    private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'add-category' })
  addCategory(payload: any) {
    const response =  this.categoryService.addCategory(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        message: data.message,
        category: data.newCategory,
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

  @MessagePattern({ cmd: 'save-category' })
  saveCategory(payload: any) {
    const response =  this.categoryService.saveCategory(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        categories: data.categories,
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

  @MessagePattern({ cmd: 'load-categories' })
  loadCategories(payload: any) {
    const response =  this.categoryService.loadCategories(payload);
    return response.then(({ data: {categories, level} }) => {
      return {status: HttpStatus.OK, categories, level};
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

  @MessagePattern({ cmd: 'load-shopee-category-attributes' })
  loadShopeeCategoryAttributes(payload: any) {
    const response =  this.shopeeService.loadShopeeCategoryAttributes(payload);
    return response.then(({ data: {attributes} }) => {
      return {status: HttpStatus.OK, attributes};
    })
    .catch(err => {
      const {response: {status, data}} = err;
      throw new RpcException({
        error: {
          status,
          message: data,
        },
      });
    });
  }

  @MessagePattern({ cmd: 'load-category' })
  loadCategory(payload: any) {
    const response =  this.categoryService.loadCategory(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        category: data.category,
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

  @MessagePattern({ cmd: 'delete-category' })
  deleteCategory(payload: any) {
    const response =  this.categoryService.deleteCategory(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        message: data.message,
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