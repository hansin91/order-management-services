import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  setProductGroup(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.patch(process.env.ADMIN_URL + '/api/products', body, { headers }).toPromise();
  }

  loadProducts(payload: any) {
    const { group, unassigned, groups, product_id, raw, token, name, page, limit } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products',
      { headers,
        params: {
        name,
        page,
        raw,
        unassigned,
        groups,
        limit,
        product_id,
        group,
      },
    }).toPromise();
  }

  loadProductDetail(payload: any) {
    const { id, token } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products/' + id,
      { headers }).toPromise();
  }

  loadProductStores(payload: any) {
    const { product_id, store_id, token, search, raw } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products/stores',
      { headers,
        params: {
        product_id,
        store_id,
        search,
        raw,
      },
    }).toPromise();
  }

  loadProductSummary(payload: any) {
    const { search, stores, status, page, token, date, shipping } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/products/summary',
      { headers,
        params: {
        date,
        shipping,
        page,
        stores,
        status,
        search,
      },
    }).toPromise();
  }
}