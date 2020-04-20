import { Module } from '@nestjs/common';
import { AuthService } from '@services';
import { AuthController } from '@controllers';

@Module({
  providers: [AuthService],
  controllers: [ AuthController],
})
export class AuthModule {}