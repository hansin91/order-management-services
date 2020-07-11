import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly httpService: HttpService) {}

  addCategory(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/categories', body, { headers }).toPromise();
  }

  saveCategory(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.put(process.env.ADMIN_URL + '/api/categories', body, { headers }).toPromise();
  }

  loadCategories(payload: any) {
    const { token, includedParent } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/categories', { headers, params: { includedParent } }).toPromise();
  }

  loadCategory(payload: any) {
    const { token, id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/categories/' + id , { headers }).toPromise();
  }

  deleteCategory(payload: any) {
    const { token, id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.delete(process.env.ADMIN_URL + '/api/categories/' + id , { headers }).toPromise();
  }
}
