import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { ReportService } from '@services'
import { HttpStatus } from '@nestjs/common'

@Processor('report-queue')
export class ReportConsumer {

  constructor(private readonly reportService: ReportService) {}

  @Process('product-job')
  async processReports(job: Job<unknown>) {
    try {
      const payload = job.data
      let response =  await this.reportService.processReports(payload)
      return {status: HttpStatus.OK}  
    } catch (error) {
      console.log(error)
    }
  }

}