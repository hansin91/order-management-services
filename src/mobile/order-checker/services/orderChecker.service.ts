import { Injectable, HttpService } from '@nestjs/common'
import { MOBILE_URL, setupHeaders } from './index'

@Injectable()
export class OrderCheckerService {
  private CHECKER_URL = MOBILE_URL + '/checker/'
  constructor(private readonly httpService: HttpService) {}
  
  findOrderCheckers(payload: any) {
    const {token, body} = payload
    return this.httpService.post(this.CHECKER_URL + 'search', body, {headers: setupHeaders(token)}).toPromise()
  }

  findOneOrderChecker(payload: any) {
    const {token, id} = payload
    return this.httpService.get(this.CHECKER_URL + `${id}`, {headers: setupHeaders(token)}).toPromise()
  }
  
  createOrderChecker(payload: any) {
    const {token, body} = payload
    return this.httpService.post(this.CHECKER_URL, body, {headers: setupHeaders(token)}).toPromise()
  }

  updateOrderCheckerDetail(payload: any) {
    const {token, body} = payload
    return this.httpService.patch(this.CHECKER_URL + 'detail', body, {headers: setupHeaders(token)}).toPromise()
  }
}