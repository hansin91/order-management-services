import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

  addCategory(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/categories', payload.body, { headers }).toPromise();
  }
}