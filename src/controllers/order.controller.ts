import { Controller, HttpStatus } from '@nestjs/common';
import { OrderService } from '@services';
import { RpcException, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'save-order'})
  saveOrder(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const response =  this.orderService.saveOrder(payload);
    return response.then(({ data: {order, param} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        data: order,
        param,
      };
    })
    .catch(err => {
      console.log(payload);
      channel.nack(message);
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }

  @MessagePattern({ cmd: 'save-mass-order'})
  async saveMassOrder(@Payload() payload: any, @Ctx() context: RmqContext ) {
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
    });
  }

  @MessagePattern({ cmd: 'update-uploaded-file'})
  async updateFile(@Payload() payload: any, @Ctx() context: RmqContext ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const response = this.orderService.updateFile(payload);
    return response.then(({ data: {file} }) => {
      channel.ack(message);
      return {
        status: HttpStatus.OK,
        file,
      };
    })
    .catch(err => {
      const { body: {modifiedUser} } = payload;
      const payloadData = {
        id: modifiedUser.id,
        email: modifiedUser.email,
        username: modifiedUser.username,
      };
      const token = jwt.sign(payloadData, process.env.SECRET_KEY, { expiresIn: '1d' });
      payload.token = token;
      this.orderService.updateFile(payload);
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }

  @MessagePattern({ cmd: 'save-bulk-order'})
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
    });
  }

  @MessagePattern({ cmd: 'edit-order' })
  editOrder(payload: any) {
    const response =  this.orderService.editOrder(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        order: data.order,
        orders: data.orders,
        list: data.list,
        products: data.products,
        statusSummary: data.statusSummary,
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

  @MessagePattern({ cmd: 'order-shippings' })
  loadOrderShippings(payload: any) {
    const response =  this.orderService.loadOrderShippings(payload);
    return response.then(({ data: {shippings} }) => {
      return {
        status: HttpStatus.OK,
        shippings,
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

  @MessagePattern({ cmd: 'uploaded-orders' })
  loadUploadedOrders(payload: any) {
    const response =  this.orderService.loadUploadedOrders(payload);
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

  @MessagePattern({ cmd: 'order-stores' })
  loadOrderStores(payload: any) {
    const response =  this.orderService.loadOrderStores(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        stores: data.stores,
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

  @MessagePattern({ cmd: 'order-dropshipping' })
  loadOrderDropshipping(payload: any) {
    const response =  this.orderService.loadOrderDropshipping(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        dropshipping: data.dropshipping,
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

  @MessagePattern({ cmd: 'orders' })
  loadOrders(payload: any) {
    const response =  this.orderService.loadOrders(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        orders: data.orders,
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

  @MessagePattern({ cmd: 'orders-shopee' })
  loadOrderShopee(payload: any) {
    const response =  this.orderService.loadOrderShopee(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        result: data.result,
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

  @MessagePattern({ cmd: 'order-total' })
  loadTotalOrderTotalPage(payload: any) {
    const response =  this.orderService.loadTotalOrderTotalPage(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
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

  @MessagePattern({ cmd: 'order-status' })
  loadOrderStatus(payload: any) {
    const response =  this.orderService.loadOrderStatus(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        list: data.list,
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

  @MessagePattern({ cmd: 'order-locked' })
  loadOrderLocked(payload: any) {
    const response =  this.orderService.loadOrderLocked(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        date: data.date,
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

  @MessagePattern({ cmd: 'order-pages' })
  loadOrderPages(payload: any) {
    const response =  this.orderService.loadOrderPages(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        pages: data.pages,
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

  @MessagePattern({ cmd: 'order-print' })
  loadPrintedOrders(payload: any) {
    const response =  this.orderService.loadPrintedOrders(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        print: data.print,
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

  @MessagePattern({ cmd: 'print-orders' })
  printOrders(payload: any) {
    const response =  this.orderService.printOrders(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        orders: data.orders,
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