import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PageService {
  constructor(private readonly httpService: HttpService) {}

  lockDate(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.patch(process.env.APP_URL + '/api/pages', payload.body, { headers }).toPromise();
  }
}