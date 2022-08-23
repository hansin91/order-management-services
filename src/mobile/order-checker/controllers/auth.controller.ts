import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices'
import { AuthService } from '../services'

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd: 'checker-auth-roles'})
  async loadRoles(@Payload() payload: string) {
    try {
      const {data} = await this.authService.loadAuthRoles(payload)
      return {status: HttpStatus.OK, roles: data}
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-verify-user'})
  async verifyUser(@Payload() payload: any) {
    try {
      const {data} = await this.authService.verifyUser(payload)
      return {status: HttpStatus.OK, data}
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-login'})
  async loginUser(payload: any) {
    try {
      const {data} = await this.authService.loginUser(payload)
      return {status: HttpStatus.OK, data}
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

  @MessagePattern({cmd: 'checker-register'})
  async registerUser(payload: any) {
    try {
      const {data} = await this.authService.registerUser(payload)
      return {status: HttpStatus.OK, data}
    } catch (err) {
      const {response: {status, data}} = err
      throw new RpcException({error: {status, message: data}})
    }
  }

}