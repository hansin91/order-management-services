import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { OrderService } from '@services'
import { HttpStatus } from '@nestjs/common'

@Processor('file-queue')
export class FileConsumer {

  constructor(private readonly orderService: OrderService) {}

  @Process('file-job')
  async uploadOrders(job: Job<unknown>) {
    const payload = job.data
    let response =  await this.orderService.startMassOrder(payload)
    const {data: {file}} = response
    return {status: HttpStatus.OK, file}
  }

}