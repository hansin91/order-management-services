import { HttpModule, Module } from "@nestjs/common"
import { AuthController } from "./controllers"
import { AuthService } from "./services"

@Module({
  imports: [HttpModule],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ]
})

export class CheckerModule {}