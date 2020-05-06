import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly httpService: HttpService) {}

  addGroup(payload: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/groups', payload.body, { headers }).toPromise();
  }

  loadGroups(token: any) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/groups', { headers }).toPromise();
  }
}
