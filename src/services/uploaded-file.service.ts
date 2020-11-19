import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class UploadedFileService {
  constructor(private readonly httpService: HttpService) {}

  loadUploadedFiles(payload: any) {
    const {token, page, limit, search} = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/upload',
      { headers,
        params: {
        limit,
        page,
        search,
      },
    }).toPromise();
  }

  findUploadedFile(payload: any) {
    const {token, id} = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/orders/upload/' + id, {headers}).toPromise();
  }

}