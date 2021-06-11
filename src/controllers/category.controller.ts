import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CategoryService } from '@services';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'add-category' })
  addCategory(payload: any) {
    const response =  this.categoryService.addCategory(payload);
    return response.then(({ data: {message, newCategory} }) => {
      return {
        status: HttpStatus.OK,
        message,
        category: newCategory,
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
    return response.then(({ data: {categories} }) => {
      return {
        status: HttpStatus.OK,
        categories,
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

  @MessagePattern({ cmd: 'load-shopee-categories' })
  loadShopeeCategories(payload: any) {
    const response =  this.categoryService.loadShopeeCategories(payload);
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

  @MessagePattern({ cmd: 'load-category-attributes' })
  loadCategoryAttributes(payload: any) {
    const response =  this.categoryService.loadCategoryAttributes(payload);
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

  @MessagePattern({ cmd: 'load-shopee-category-attributes' })
  loadShopeeCategoryAttributes(payload: any) {
    const response =  this.categoryService.loadShopeeCategoryAttributes(payload);
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
    return response.then(({ data: {category} }) => {
      return {status: HttpStatus.OK, category};
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
    return response.then(({ data: {message} }) => {
      return {status: HttpStatus.OK, message};
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