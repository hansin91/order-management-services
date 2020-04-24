import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  login(payload) {
    return this.httpService.post(process.env.ADMIN_URL + '/api/auth/login', payload).toPromise();
  }

  googleLogin(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/auth/gLogin', '', { headers }).toPromise();
  }

  verify(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/auth/verify', '', { headers } ).toPromise();
  }
}
