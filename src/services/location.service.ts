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

  deleteWarehouse(payload: any) {
    const { token, id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.delete(process.env.ADMIN_URL + '/api/warehouses/' + id , { headers }).toPromise();
  }

  loadRooms(payload: any) {
    const { token } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/rooms', { headers }).toPromise();
  }

  createRoom(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/rooms', body, { headers }).toPromise();
  }

  deleteRoom(payload: any) {
    const { token, id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.delete(process.env.ADMIN_URL + '/api/rooms/' + id , { headers }).toPromise();
  }

  loadRacks(payload: any) {
    const { token } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/racks', { headers }).toPromise();
  }

  createRack(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/racks', body, { headers }).toPromise();
  }

  deleteRack(payload: any) {
    const { token, id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.delete(process.env.ADMIN_URL + '/api/racks/' + id , { headers }).toPromise();
  }

  loadLocations(payload: any) {
    const { token, name, warehouse_id, rack_id, room_id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.get(process.env.ADMIN_URL + '/api/locations',
      { headers,
        params: { name, warehouse_id, rack_id, room_id } }).toPromise();
  }

  createLocation(payload: any) {
    const { token, body } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.post(process.env.ADMIN_URL + '/api/locations', body, { headers }).toPromise();
  }

  deleteLocation(payload: any) {
    const { token, id } = payload;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return this.httpService.delete(process.env.ADMIN_URL + '/api/locations/' + id , { headers }).toPromise();
  }
}
