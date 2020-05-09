import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly httpService: HttpService) {}

  loadOrderShippings(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/shipping',
      { headers,
        params: {
        date: payload.date,
      },
    }).toPromise();
  }

}