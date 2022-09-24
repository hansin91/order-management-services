import { HttpModule, Module } from '@nestjs/common'
import { AuthController, OrderController } from './controllers'
import { AuthService, StatusService, OrderCheckerService, OrderService } from './services'

@Module({
  imports: [HttpModule],
  controllers: [
    AuthController,
    OrderController
  ],
  providers: [
    AuthService,
    OrderService,
    StatusService,
    OrderCheckerService
  ]
})

export class CheckerModule {}