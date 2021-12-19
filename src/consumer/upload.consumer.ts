import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { UploadedOrderService } from '@services'
import { HttpStatus } from '@nestjs/common'

@Processor('upload-queue')
export class UploadConsumer {

  constructor(private readonly uploadedOrderService: UploadedOrderService) {}

  @Process('upload-job')
  async uploadOrders(job: Job<unknown>) {
    const payload = job.data
    let response =  await this.uploadedOrderService.createUploadedOrders(payload)
    const {data: {file}} = response
    return {status: HttpStatus.OK, file}
  }

}