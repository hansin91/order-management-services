import * as jwt from 'jsonwebtoken';
import { Controller, HttpStatus } from '@nestjs/common';
import { RpcException, MessagePattern, Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { OrderService, UploadedFileService } from '@services';

@Controller()
export class OrderController {
  constructor(
    private readonly uploadedFileService: UploadedFileService,
    private readonly orderService: OrderService) {
  }

  @EventPattern('save-order')
  saveOrder(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef()
    const message = context.getMessage()
    let response =  this.orderService.saveOrder(payload)
    return response.then(({ data: {order, param} }) => {
      channel.ack(message)
      return {status: HttpStatus.OK, data: order, param}
    })
    .catch(err => {
      const errorMessage = err.response.data;
      console.log(err.response.data, '----save order----')
      if (errorMessage.trim() === 'Please login first') {
        const {body: {userId, user} } = payload;
        const payloadData = {
          id: userId,
          email: user ? (user.email ? user.email : '') : '',
          username: user ? user.username : '',
        }
        const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' })
        payload.token = token
        response = this.orderService.saveOrder(payload)
        return response.then(({ data: {order, param} }) => {
          channel.ack(message)
          return {status: HttpStatus.OK, data: order, param}
        })
      } else {
        throw new RpcException({
          error: {status: err.response.status, message: err.response.data}
        })
      }
    })
  }

  @EventPattern('save-mass-order')
  async saveMassOrder(@Payload() payload: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    let response = this.orderService.saveMassOrder(payload);
    return response.then(({ data: {orders} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        orders,
      };
    })
    .catch(err => {
      console.log(err.response, '----save mass order----')
      const errorMessage = err.response.data;
      if (errorMessage.trim() === 'Please login first') {
        const {body: {user} } = payload;
        const payloadData = {
          id: user.id,
          email: user.email ? user.email : '',
          username: user.username,
        };
        const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' });
        payload.token = token;
        response = this.orderService.saveMassOrder(payload);
        return response.then(({ data: {orders} }) => {
          channel.ack(message);
          return {
            status: HttpStatus.OK,
            orders,
          };
        });
      } else {
        throw new RpcException({
          error: {
            status: err.response.status,
            message: err.response.data,
          },
        });
      }
    });
  }

  @EventPattern('start-mass-order')
  async updateFile(@Payload() payload: any, @Ctx() context: RmqContext ) {
    let channel = context.getChannelRef();
    let message = context.getMessage();
    let response = this.orderService.startMassOrder(payload);
    return response.then(({ data: {file} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        file,
      };
    })
    .catch(err => {
      console.log(err.response, '----start mass order----')
      const errorMessage = err.response.data;
      if (errorMessage.trim() === 'Please login first') {
        const { body: {modifiedUser} } = payload;
        const payloadData = {
          id: modifiedUser.id,
          email: modifiedUser.email ? modifiedUser.email : '',
          username: modifiedUser.username,
        };
        const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' });
        payload.token = token;
        response = this.orderService.startMassOrder(payload);
        return response.then(({ data: {file} }) => {
          channel.ack(message);
          return {
            status: HttpStatus.OK,
            file,
          };
        });
      } else {
        channel = context.getChannelRef();
        message = context.getMessage();
        channel.ack(message);
        throw new RpcException({
          error: {
            status: err.response.status,
            message: err.response.data,
          },
        });
      }
    });
  }

  @EventPattern('save-bulk-order')
  saveBulkOrder(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    let response =  this.orderService.saveBulkOrder(payload);
    return response.then(({ data: {orders, param} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        data: orders,
        param,
      };
    })
    .catch(err => {
      console.log(err.response, '----save bulk order----')
      const errorMessage = err.response.data;
      if (errorMessage.trim() === 'Please login first') {
        const {body: {user} } = payload;
        const payloadData = {
          id: user.id,
          email: user.email ? user.email : '',
          username: user.username,
        };
        const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' });
        payload.token = token;
        response =  this.orderService.saveBulkOrder(payload);
        return response.then(({ data: {orders, param} }) => {
          channel.ack(message);
          return {
            status: HttpStatus.OK,
            data: orders,
            param,
          };
        });
      } else {
        throw new RpcException({
          error: {
            status: err.response.status,
            message: err.response.data,
          },
        });
      }
    });
  }

  @MessagePattern({ cmd: 'edit-order' })
  editOrder(payload: any) {
    const response =  this.orderService.editOrder(payload);
    return response.then(({ data: {order, list, products, statusSummary} }) => {
      return {
        status: HttpStatus.OK,
        order,
        list,
        products,
        statusSummary
      };
    })
    .catch(err => {
      console.log(err.response, '----edit order----')
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }

  @MessagePattern({ cmd: 'order-shippings' })
  loadOrderShippings(payload: any) {
    const response =  this.orderService.loadOrderShippings(payload);
    return response.then(({ data: {shippings} }) => {
      return {status: HttpStatus.OK, shippings};
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

  @MessagePattern({ cmd: 'uploaded-files' })
  loadUploadedFiles(payload: any) {
    const response =  this.uploadedFileService.loadUploadedFiles(payload);
    return response.then(({ data: {files, count} }) => {
      return {
        status: HttpStatus.OK,
        files,
        count,
      };
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

  @MessagePattern({ cmd: 'delete-uploaded-file' })
  deleteUploadedFile(payload: any) {
    const response =  this.uploadedFileService.deleteUploadedFile(payload);
    return response.then(({ data: {id, message} }) => {
      return {status: HttpStatus.OK, id, message};
    })
    .catch(err => {
      const {response: {status, data}} = err;
      throw new RpcException({
        error: {status, message: data},
      });
    });
  }

  @MessagePattern({ cmd: 'uploaded-file' })
  findUploadedFile(payload: any) {
    const response =  this.uploadedFileService.findUploadedFile(payload);
    return response.then(({ data: {file} }) => {
      return {status: HttpStatus.OK, file};
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

  @MessagePattern({ cmd: 'update-uploaded-file' })
  updateUploadedFile(payload: any) {
    const response =  this.uploadedFileService.updateUploadedFile(payload);
    return response.then(({ data: {file} }) => {
      return {status: HttpStatus.OK, file};
    })
    .catch(err => {
      console.log(err.response, '----update uploaded file----')
      const {response: {status, data}} = err;
      throw new RpcException({
        error: {status, message: data},
      });
    });
  }

  @MessagePattern({ cmd: 'order-stores' })
  loadOrderStores(payload: any) {
    const response =  this.orderService.loadOrderStores(payload);
    return response.then(({ data: {stores} }) => {
      return {status: HttpStatus.OK, stores};
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

  @MessagePattern({ cmd: 'order-dropshipping' })
  loadOrderDropshipping(payload: any) {
    const response =  this.orderService.loadOrderDropshipping(payload);
    return response.then(({ data: {dropshipping} }) => {
      return {status: HttpStatus.OK, dropshipping};
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

  @MessagePattern({cmd: 'exported-orders'})
  loadExportedOrders(payload: any) {
    const response = this.orderService.loadExportedOrders(payload)
    return response.then(({ data: {orders} }) => {
      return {status: HttpStatus.OK, orders};
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

  @MessagePattern({ cmd: 'orders' })
  loadOrders(payload: any) {
    const response =  this.orderService.loadOrders(payload);
    return response.then(({ data: {orders, logisticMessages} }) => {
      return {status: HttpStatus.OK, orders, logisticMessages};
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

  @MessagePattern({ cmd: 'orders-shopee' })
  loadOrderShopee(payload: any) {
    const response =  this.orderService.loadOrderShopee(payload);
    return response.then(({ data: {result} }) => {
      return {status: HttpStatus.OK, result};
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

  @MessagePattern({ cmd: 'order-total' })
  loadTotalOrderTotalPage(payload: any) {
    const response =  this.orderService.loadTotalOrderTotalPage(payload);
    return response.then(({ data: {total} }) => {
      return {status: HttpStatus.OK, total};
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

  @MessagePattern({ cmd: 'order-status' })
  loadOrderStatus(payload: any) {
    const response =  this.orderService.loadOrderStatus(payload);
    return response.then(({ data: {list} }) => {
      return {status: HttpStatus.OK, list};
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

  @MessagePattern({ cmd: 'order-locked' })
  loadOrderLocked(payload: any) {
    const response =  this.orderService.loadOrderLocked(payload);
    return response.then(({ data: {date} }) => {
      return {status: HttpStatus.OK, date};
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

  @MessagePattern({ cmd: 'order-pages' })
  loadOrderPages(payload: any) {
    const response =  this.orderService.loadOrderPages(payload);
    return response.then(({ data: {pages} }) => {
      return {status: HttpStatus.OK, pages};
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

  @MessagePattern({ cmd: 'order-print' })
  loadPrintedOrders(payload: any) {
    const response =  this.orderService.loadPrintedOrders(payload)
    return response.then(({ data: {print} }) => {
      return {status: HttpStatus.OK, print}
    })
    .catch(err => {
      const {response: {status, data}} = err
      throw new RpcException({
        error: { status, message: data }
      })
    })
  }

  @MessagePattern({ cmd: 'print-orders' })
  printOrders(payload: any) {
    const response =  this.orderService.printOrders(payload);
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

  @MessagePattern({ cmd: 'mass-order-detail' })
  processMassOrderDetail(payload: any) {
    const response =  this.orderService.processMassOrderDetail(payload);
    return response.then(({ data: {orders} }) => {
      return {status: HttpStatus.OK, orders};
    })
    .catch(err => {
      console.log(err.response, '----mass order detail----')
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }

  @EventPattern('insert-order-detail')
  insertOrderDetail(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    let response =  this.orderService.insertOrderDetails(payload);
    return response.then(({ data: {orders} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        data: orders,
      };
    })
    .catch(err => {
      const errorMessage = err.response.data;
      if (errorMessage.trim() === 'Please login first') {
        const {body: {user} } = payload;
        const payloadData = {
          id: user.id,
          email: user.email ? user.email : '',
          username: user.username,
        };
        const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' });
        payload.token = token;
        response =  this.orderService.insertOrderDetails(payload);
        return response.then(({ data: {orders} }) => {
          channel.ack(message);
          return {
            status: HttpStatus.OK,
            data: orders,
          };
        });
      } else {
        throw new RpcException({
          error: {
            status: err.response.status,
            message: err.response.data,
          },
        });
      }
    });
  }

  @MessagePattern({cmd: 'load-single-order'})
  loadSingleOrder(payload: any) {
    const response =  this.orderService.findSingleOrder(payload)
    return response.then(({ data: {order} }) => {
      return {status: HttpStatus.OK, order}
    })
    .catch(err => {
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        }
      })
    })
  }
}
