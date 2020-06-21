import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  loadProducts(payload: any) {
    const { token, name, page, limit } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products',
      { headers,
        params: {
        name,
        page,
        limit,
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