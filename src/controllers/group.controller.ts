import { Controller, HttpStatus } from '@nestjs/common';
import { GroupService } from '@services';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @MessagePattern({ cmd: 'add-group' })
  addGroup(payload: any) {
    const response =  this.groupService.addGroup(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        message: data.message,
        group: data.newGroup,
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

  @MessagePattern({ cmd: 'edit-group' })
  editGroup(payload: any) {
    const response =  this.groupService.editGroup(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        message: data.message,
        group: data.group,
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

  @MessagePattern({ cmd: 'load-groups' })
  loadGroups(token: string) {
    const response =  this.groupService.loadGroups(token);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        groups: data.groups,
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