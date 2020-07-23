import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class StockService {
  constructor(private readonly httpService: HttpService) {}

  loadStocks(payload: any) {
    const { token, codes, ids } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/stocks',
      { headers, params: { codes, ids } }).toPromise();
  }

}