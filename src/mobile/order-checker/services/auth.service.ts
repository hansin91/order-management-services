import { Injectable, HttpService } from '@nestjs/common'
import { MOBILE_URL, setupHeaders } from './index'

@Injectable()
export class AuthService {
  private USERS_URL = MOBILE_URL + '/users/'
  constructor(private readonly httpService: HttpService) {}

  loadAuthRoles(payload: string) {
    let params = {} as any
    if (payload) {
      params.type = payload
    }
    return this.httpService.get(MOBILE_URL + '/roles', { headers: setupHeaders(), params }).toPromise()
  }

  verifyUser(payload: any) {
    const {token} = payload
    return this.httpService.post(this.USERS_URL + 'verify', payload, {headers: setupHeaders(token)}).toPromise()
  } 

  registerUser(payload: any) {
    return this.httpService.post(this.USERS_URL + 'register', payload, {headers: setupHeaders()}).toPromise()
  }

  loginUser(payload: any) {
    return this.httpService.post(this.USERS_URL + 'login', payload, {headers: setupHeaders()}).toPromise()
  }
}