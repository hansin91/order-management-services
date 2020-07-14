import { Controller, HttpStatus } from '@nestjs/common';
import { LocationService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @MessagePattern({ cmd: 'delete-location' })
  deleteLocation(payload: any) {
    const response =  this.locationService.deleteLocation(payload);
    return response.then(({ data: { message } }) => {
      return {
        status: HttpStatus.OK,
        message,
      };
    })
    .catch(err => {
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }

  @MessagePattern({ cmd: 'create-location' })
  createLocation(payload: any) {
    const response =  this.locationService.createLocation(payload);
    return response.then(({ data: { message, newLocation } }) => {
      return {
        status: HttpStatus.OK,
        message,
        location: newLocation,
      };
    })
    .catch(err => {
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }

  @MessagePattern({ cmd: 'load-locations' })
  loadLocations(payload: any) {
    const response =  this.locationService.loadLocations(payload);
    return response.then(({ data: { locations } }) => {
      return {
        status: HttpStatus.OK,
        locations,
      };
    })
    .catch(err => {
      throw new RpcException({
        error: {
          status: err.response.status,
          message: err.response.data,
        },
      });
    });
  }
}