import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  login(payload) {
    return this.httpService.post(process.env.ADMIN_URL + '/api/auth/login', payload).toPromise();
  }

  verify(token: string) {
    const headers = {
      'Content-Type': 'application/json', // afaik this one is not needed
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/auth/verify', '', { headers } ).toPromise();
  }
}
