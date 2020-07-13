import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(private readonly httpService: HttpService) {}

  loadWarehouses(payload: any) {
    const { token } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/warehouses',
      { headers }).toPromise();
  }

  createWarehouse(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/warehouses', body, { headers }).toPromise();
  }
}
