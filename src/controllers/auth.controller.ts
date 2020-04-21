import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { AuthService } from '@services';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login'})
  login(payload: any) {
    const response =  this.authService.login(payload);
    return response.then(({ data }) => {
      return {
        status: HttpStatus.OK,
        token: data.token,
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

  @MessagePattern({ cmd: 'verify'})
  verify(token: string) {
    return this.authService.verify(token)
    .then(({ data }) => {
      return {
        status: HttpStatus.OK,
        user: data.user,
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