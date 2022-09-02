import { HttpModule, Module } from '@nestjs/common'
import { AuthController, OrderController } from './controllers'
import { AuthService, OrderCheckerService, OrderService } from './services'

@Module({
  imports: [HttpModule],
  controllers: [
    AuthController,
    OrderController
  ],
  providers: [
    AuthService,
    OrderService,
    OrderCheckerService
  ]
})

export class CheckerModule {}