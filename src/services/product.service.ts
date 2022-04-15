import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  setProductGroup(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.patch(process.env.ADMIN_URL + '/api/products', body, { headers }).toPromise();
  }

  loadShopeeV2Products(payload: any) {
    const {token, body} = payload
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    return this.httpService.post(process.env.APP_URL + '/shopee/v2/products', body, {headers}).toPromise()
  }

  editProductStore(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.put(process.env.ADMIN_URL + '/api/products/stores', body, { headers }).toPromise();
  }

  createProductStore(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/products/stores', body, { headers }).toPromise();
  }

  mappingProducts(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/products/mapped', body, { headers }).toPromise();
  }

  loadProducts(payload: any) {
    const { group, bulk, categories, locations, warehouses, rooms, racks, unassigned, groups, id, raw, token, name, page, limit, ids } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products',
      { headers,
        params: {
        name,
        page,
        raw,
        unassigned,
        categories,
        bulk,
        groups,
        locations,
        warehouses,
        rooms,
        racks,
        limit,
        id,
        ids,
        group,
      },
    }).toPromise();
  }

  loadProductDetail(payload: any) {
    const { id, token } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products/' + id, { headers }).toPromise();
  }

  loadProductStores(payload: any) {
    const { product_id, store_id, token, search, raw, product_store_id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products/stores',
      { headers,
        params: {
        product_id,
        store_id,
        product_store_id,
        search,
        raw,
      },
    }).toPromise();
  }

  loadUnmappedProducts(payload: any) {
    const { name, page, token, limit, groupId } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/products/unmapped',
      { headers,
        params: {
        name,
        page,
        limit,
        groupId,
      },
    }).toPromise();
  }

  loadProductSummary(payload: any) {
    const { search, stores, status, page, token, date, shipping } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.APP_URL + '/api/products/summary',
      { headers,
        params: {
        date,
        shipping,
        page,
        stores,
        status,
        search,
      },
    }).toPromise();
  }
}