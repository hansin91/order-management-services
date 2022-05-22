import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { ReportService } from '@services'

@Controller()
export class ReportController {

  constructor(private readonly reportService: ReportService) {}

  @MessagePattern({cmd: 'file-downloaded'})
  fileDownloaded(payload: any) {
    const response =  this.reportService.fileDownloaded(payload)
    return response.then(({ data: {report} }) => {
      return { status: HttpStatus.OK, report }
    })
    .catch(err => {
      const {response: {status, data}} = err
      throw new RpcException({ error: { status, message: data }})
    })
  }

  @MessagePattern({ cmd: 'create-report' })
  createReport(payload: any) {
    const response =  this.reportService.createReport(payload)
    return response.then(({ data: {report} }) => {
      return { status: HttpStatus.OK, report }
    })
    .catch(err => {
      const {response: {status, data}} = err
      throw new RpcException({ error: { status, message: data }})
    })
  }

  @MessagePattern({ cmd: 'load-reports' })
  loadReports(payload: any) {
    const response =  this.reportService.loadReports(payload)
    return response.then(({ data: {reports} }) => {
      return { status: HttpStatus.OK, reports }
    })
    .catch(err => {
      const {response: {status, data}} = err
      throw new RpcException({ error: { status, message: data }})
    })
  } 
}