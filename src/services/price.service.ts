import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PriceService {
  constructor(private readonly httpService: HttpService) {}

  loadPrices(payload: any) {
    const { token, codes } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/prices',
      { headers, params: { codes } }).toPromise();
  }

}