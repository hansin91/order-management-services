import { HttpService, Injectable } from '@nestjs/common'
import { MOBILE_URL, setupHeaders } from './index'

@Injectable()
export class StatusService {
  private STATUS_URL = MOBILE_URL + '/status/'
  constructor(private readonly httpService: HttpService) {}

  findStatus(payload: any) {
    const {token, body} = payload
    return this.httpService.post(this.STATUS_URL + 'find', body, {headers: setupHeaders(token)}).toPromise()
  }
}