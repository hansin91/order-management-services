import { OnQueueActive, OnQueueCompleted, OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { OrderService } from '@services'
import { HttpStatus } from '@nestjs/common'

@Processor('order-queue')
export class OrderConsumer {

  constructor(private readonly orderService: OrderService) {}

  @Process('order-job')
  async readOperationJob(job: Job<unknown>) {
    const payload = job.data as any
    const {type} = payload
    if (type === 'single') {
      const {data} = await this.orderService.saveOrder(payload)
      const {order, param} = data
      return {status: HttpStatus.OK, data: order, param}
    } else if (type === 'bulk') {
      let {data} =  await this.orderService.saveBulkOrder(payload)
      const {orders, param} = data
      return {status: HttpStatus.OK, data: orders, param}
    } else {
      const response = await this.orderService.saveMassOrder(payload)
      const {data: {orders} } = response
      return {status: HttpStatus.OK, orders}
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    )
  }

  // @OnQueueError()
  // onError(error: Error) {
  //   console.log(`${error.name}: ${error.message}`)
  // }

  // @OnQueueFailed()
  // onFailed(job: Job, err: Error) {
  //   console.log(
  //     `Failed: Processing job ${job.id} of type ${job.name} with data ${job.data}...\n
  //     ${err.name}: ${err.message}
  //     `,
  //   )
  // }

  @OnQueueCompleted()   
  onCompleted(job: Job, result: any) {
    console.log(
      `Completed: Processing job ${job.id} of type ${job.name} with data ${job.data}...\n
      ${result}
      `,
    )
  }

}