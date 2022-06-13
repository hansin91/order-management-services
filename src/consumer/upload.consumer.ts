import { OnQueueActive, OnQueueError, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull'
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

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    )
  }

  @OnQueueError()
  onError(error: Error) {
    console.log(`${error.name}: ${error.message}`)
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.log(
      `Failed: Processing job ${job.id} of type ${job.name} with data ${job.data}...
      ${err.name}: ${err.message}
      `,
    )
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(
      `Completed: Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    )
  }

}