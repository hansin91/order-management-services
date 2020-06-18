import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  loadProductSummary(payload: any) {
    const { stores, status, page, token, date, shipping } = payload;
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
      },
    }).toPromise();
  }
}