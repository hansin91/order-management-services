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
    const { group, raw, token, name, page, limit } = payload;
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
        limit,
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
    const { product_id, token } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products/stores',
      { headers,
        params: {
        product_id,
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