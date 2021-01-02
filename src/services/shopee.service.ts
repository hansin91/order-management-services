import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ShopeeService {
  constructor(private readonly httpService: HttpService) {}

  loadShopeeCategoryAttributes(payload: any) {
    const {token, id, shopId} = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/categories/shopee/' + id + '/attributes' , { headers, params: {shopId} }).toPromise();
  }
}