import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly httpService: HttpService) {}

  saveOrder(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders', payload.body, { headers }).toPromise();
  }

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

  loadOrderStatus(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/status',
      { headers,
        params: {
        date: payload.date,
      },
    }).toPromise();
  }

  loadTotalOrderTotalPage(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/total',
      { headers,
        params: {
        date: payload.date,
      },
    }).toPromise();
  }

  loadOrders(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders',
      { headers,
        params: {
        date: payload.date,
        shipping: payload.shipping,
        page: payload.page,
        status: payload.status,
        shippingId: payload.shippingId,
      },
    }).toPromise();
  }

  loadOrderLocked(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/locked',
      { headers,
        params: {
        date: payload.date,
      },
    }).toPromise();
  }

}