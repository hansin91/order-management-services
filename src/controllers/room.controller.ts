import { Controller, HttpStatus } from '@nestjs/common';
import { LocationService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class RoomController {
  constructor(private readonly roomService: LocationService) {}

  @MessagePattern({ cmd: 'delete-room' })
  deleteRoom(payload: any) {
    const response =  this.roomService.deleteRoom(payload);
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

  @MessagePattern({ cmd: 'create-room' })
  createRoom(payload: any) {
    const response =  this.roomService.createRoom(payload);
    return response.then(({ data: { message, newRoom } }) => {
      return {
        status: HttpStatus.OK,
        message,
        room: newRoom,
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

  @MessagePattern({ cmd: 'load-rooms' })
  loadRooms(payload: any) {
    const response =  this.roomService.loadRooms(payload);
    return response.then(({ data: { rooms } }) => {
      return {
        status: HttpStatus.OK,
        rooms,
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