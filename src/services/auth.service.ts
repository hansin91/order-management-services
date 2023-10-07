import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  login(payload: any) {
    return this.httpService.post(process.env.APP_URL + '/api/auth/login', payload).toPromise();
  }

  googleLogin(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/auth/gLogin', '', { headers }).toPromise();
  }

  verify(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/auth/verify', '', { headers } ).toPromise();
  }

  logout(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/auth/logout', '', { headers } ).toPromise();
  }
}
