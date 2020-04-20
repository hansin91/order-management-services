import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from '@services';
import { AuthController } from '@controllers';

@Module({
  imports: [HttpModule],
  providers: [AuthService],
  controllers: [ AuthController],
})
export class AppModule {}
