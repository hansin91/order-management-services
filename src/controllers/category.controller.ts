import { Controller, HttpStatus } from '@nestjs/common';
import { CategoryService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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

  @MessagePattern({ cmd: 'load-categories' })
  loadCategories(payload: any) {
    const response =  this.categoryService.loadCategories(payload);
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
}