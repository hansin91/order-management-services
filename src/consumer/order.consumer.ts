import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { OrderService } from '@services'
import { HttpStatus } from '@nestjs/common'

@Processor('order-queue')
export class OrderConsumer {

  constructor(private readonly orderService: OrderService) {}

  @Process('order-job')
  async readOperationJob(job: Job<unknown>) {
    const payload = job.data
    const response = await this.orderService.saveMassOrder(payload)
    const {data: {orders} } = response
    return {status: HttpStatus.OK, orders}
  }

}