import { Injectable, HttpService } from '@nestjs/common'

@Injectable()
export class ReportService {
  constructor(private readonly httpService: HttpService) {}

  requestReport(payload: any) {
    const {token, body} = payload
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    return this.httpService.post(process.env.APP_URL + '/reports', body, { headers }).toPromise()
  }

  processingProductsReport(payload: any) {
    const {token, body} = payload
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    return this.httpService.post(process.env.APP_URL + '/reports/products', body, { headers }).toPromise()
  }

  findReports(payload: any) {
    const {token, body} = payload
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    const {type} = body
    return this.httpService.get(process.env.APP_URL + '/reports', {headers, params: {type}}).toPromise()
  }
}