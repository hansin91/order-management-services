import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PageService {
  constructor(private readonly httpService: HttpService) {}

  lockDate(payload: any) {
    const {token, body} = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.patch(process.env.APP_URL + '/api/pages', body, { headers }).toPromise();
  }
}