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
}
