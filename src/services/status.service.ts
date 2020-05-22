import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class StatusService {
  constructor(private readonly httpService: HttpService) {}

  loadStatus(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/status',
      { headers,
        params: {
        flag: payload.flag,
      },
    }).toPromise();
  }
}