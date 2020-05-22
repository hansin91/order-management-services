import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ShippingService {
  constructor(private readonly httpService: HttpService) {}

  loadShippings(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/shippings', { headers }).toPromise();
  }

  loadShippingOrders(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/shippings/orders',
    { headers,
      params: {
        date: payload.date,
        pages: payload.pages,
        shipping: payload.shipping,
      },
    }).toPromise();
  }
}