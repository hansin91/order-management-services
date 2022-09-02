import { HttpService, Injectable } from '@nestjs/common'
import { MOBILE_URL, setupHeaders } from './index'

@Injectable()
export class OrderService {
  private ORDERS_URL = MOBILE_URL + '/orders/'
  constructor(private readonly httpService: HttpService) {}

  findOrder(payload: any) {
    const {token, body} = payload
    return this.httpService.post(this.ORDERS_URL + 'search', body, {headers: setupHeaders(token)}).toPromise()
  }
}