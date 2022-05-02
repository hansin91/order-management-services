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
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.put(process.env.APP_URL + '/api/orders', body, { headers }).toPromise();
  }

  loadOrderShopee(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders/shopee', payload, { headers }).toPromise();
  }

  saveBulkOrder(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders/bulk', body, { headers }).toPromise();
  }

  loadOrderShippings(payload: any) {
    const { search, token, stores, dropshipping, status, shipping, date, start, end } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/shippings',
      { headers,
        params: {
        date,
        start,
        status,
        end,
        shipping,
        dropshipping,
        stores,
        search,
      },
    }).toPromise();
  }

  loadOrderStores(payload: any) {
    const { search, token, stores, dropshipping, status, shipping, date, start, end } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/stores',
      { headers,
        params: {
        date,
        start,
        status,
        end,
        shipping,
        dropshipping,
        stores,
        search,
      },
    }).toPromise();
  }

  loadOrderDropshipping(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    const { search, stores, dropshipping, status, shipping, date, start, end } = payload;
    return this.httpService.get(process.env.APP_URL + '/api/orders/dropshipping',
      { headers,
        params: {
        date,
        start,
        status,
        end,
        shipping,
        dropshipping,
        stores,
        search,
      },
    }).toPromise();
  }

  loadOrderStatus(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    const { search, stores, dropshipping, shipping, status, date, start, end } = payload;
    return this.httpService.get(process.env.APP_URL + '/api/orders/status',
      { headers,
        params: {
        date,
        start,
        end,
        shipping,
        status,
        dropshipping,
        stores,
        search,
      },
    }).toPromise();
  }

  loadTotalOrderTotalPage(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    const { search, stores, dropshipping, shipping, status, date, start, end } = payload;
    return this.httpService.get(process.env.APP_URL + '/api/orders/total',
      { headers,
        params: {
        date,
        start,
        end,
        shipping,
        status,
        dropshipping,
        stores,
        search,
      },
    }).toPromise();
  }

  loadExportedOrders(payload: any) {
    const {token, body} = payload
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    return this.httpService.post(process.env.APP_URL + '/api/orders/export', body, {headers}).toPromise()
  }

  loadOrders(payload: any) {
    const { search, token, stores, dropshipping, offset, limit, start, end, shippingId, status, date, page, shipping } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders',
      { headers,
        params: {
        date,
        shipping,
        page,
        status,
        shippingId,
        start,
        end,
        offset,
        limit,
        search,
        dropshipping,
        stores,
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
    const { token, date } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/pages',
      { headers,
        params: { date },
    }).toPromise();
  }

  loadPrintedOrders(payload: any) {
    const { token, date, page, isSummary, document } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const params = {date, page, isSummary, document} as any
    return this.httpService.get(process.env.APP_URL + '/api/orders/print', { headers, params }).toPromise();
  }

  saveMassOrder(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders/mass', body, { headers }).toPromise();
  }

  startMassOrder(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.patch(process.env.APP_URL + '/api/orders/mass', body, { headers }).toPromise();
  }

  processMassOrderDetail(payload: any) {
    const {token, body} = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders/details/mass', body, { headers }).toPromise();
  }

  insertOrderDetails(payload: any) {
    const {token, body} = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/orders/details', body, { headers }).toPromise();
  }

  findSingleOrder(payload: any) {
    const {token, body} = payload
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    return this.httpService.get(process.env.APP_URL + `/api/orders/${body}`, {headers}).toPromise()
  }

}