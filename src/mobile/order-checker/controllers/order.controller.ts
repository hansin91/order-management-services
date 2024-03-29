import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { OrderCheckerService, StatusService, OrderService } from '../services'

@Controller()
export class OrderController {

  constructor(
    private readonly statusService: StatusService,
    private readonly orderCheckerService: OrderCheckerService,
    private readonly orderService: OrderService) {}

  @MessagePattern({cmd: 'checker-scan-queue'})
  async scanOrder(@Payload() payload: any) {
    try {
      const {data} = await this.orderService.findOrder(payload)
      return {status: HttpStatus.OK, data}
    } catch (err) { 
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-find-one'})
  async findOneOrderChecker(@Payload() payload: any) {
    try {
      const {data} = await this.orderCheckerService.findOneOrderChecker(payload)
      return {status: HttpStatus.OK, data}
    } catch (err) { 
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-status'})
  async findStatus(@Payload() payload: any) {
    try {
      const {data} = await this.statusService.findStatus(payload)
      return {status: HttpStatus.OK, data}
    } catch (err) { 
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-search'})
  async findOrderCheckers(@Payload() payload: any) {
    try {
      const {data} = await this.orderCheckerService.findOrderCheckers(payload)
      return {status: HttpStatus.OK, data} 
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-detail-update'})
  async updateOrderCheckerDetail(@Payload() payload: any) {
    try {
      const {data} = await this.orderCheckerService.updateOrderCheckerDetail(payload)
      return {status: HttpStatus.OK, data} 
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-create'})
  async createOrderChecker(@Payload() payload: any) {
    try {
      const {data} = await this.orderCheckerService.createOrderChecker(payload)
      return {status: HttpStatus.OK, data} 
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }
}

