import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { ReportService } from '@services'
import { HttpStatus } from '@nestjs/common'

@Processor('products-report-queue')
export class ProductsReportConsumer {

  constructor(private readonly reportService: ReportService) {}

  @Process('products-report-job')
  async createRequestReport(job: Job<unknown>) {
    const payload = job.data
    let response =  await this.reportService.processingProductsReport(payload)
    return {status: HttpStatus.OK}
  }

}