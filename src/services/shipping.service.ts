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
    const { token, date, pages, shipping } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/shippings/orders', { headers, params: { date, pages, shipping }}).toPromise();
  }

  loadShopeeShippings(payload: any) {
    const { token, testing } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/shippings/shopee', { headers, params: { testing }}).toPromise();
  }
}