import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { ReportService } from '@services'

@Controller()
export class ReportController {

  constructor(private readonly reportService: ReportService) {}

  @MessagePattern({ cmd: 'request-report' })
  requestReport(payload: any) {
    const response =  this.reportService.requestReport(payload)
    return response.then(({ data: {report} }) => {
      return { status: HttpStatus.OK, report }
    })
    .catch(err => {
      throw new RpcException({ error: { status: err.response.status, message: err.response.data }})
    })
  }

  @MessagePattern({ cmd: 'find-reports' })
  findReports(payload: any) {
    const response =  this.reportService.findReports(payload)
    return response.then(({ data: {reports} }) => {
      return { status: HttpStatus.OK, reports }
    })
    .catch(err => {
      throw new RpcException({ error: { status: err.response.status, message: err.response.data }})
    })
  } 
}