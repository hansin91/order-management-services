import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly httpService: HttpService) {}

  saveOrder(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders', body, { headers }).toPromise();
  }

  printOrders(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.patch(process.env.APP_URL + '/api/orders', body, { headers }).toPromise();
  }

  editOrder(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.put(process.env.APP_URL + '/api/orders', payload.body, { headers }).toPromise();
  }

  saveBulkOrder(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders/bulk', payload.body, { headers }).toPromise();
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

  loadOrderPages(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/pages',
      { headers,
        params: {
        date: payload.date,
      },
    }).toPromise();
  }

  loadPrintedOrders(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    const { date, page, isSummary } = payload;
    return this.httpService.get(process.env.APP_URL + '/api/orders/print',
      { headers,
        params: {
        date,
        page,
        isSummary,
      },
    }).toPromise();
  }

}