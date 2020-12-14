import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class UploadedOrderService {
  constructor(private readonly httpService: HttpService) {}

  createUploadedOrders(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.APP_URL + '/api/uploaded-orders', body, { headers }).toPromise();
  }
}
