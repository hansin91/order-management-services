import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class StoreService {
  constructor(private readonly httpService: HttpService) {}

  loadStoreShippings(payload: any) {
    const { stores, token, start, end, dropshipping, date, shipping, page, status } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/stores/shippings',
      { headers,
        params: {
        date,
        shipping,
        page,
        status,
        start,
        end,
        dropshipping,
        stores,
      },
    }).toPromise();
  }
}
