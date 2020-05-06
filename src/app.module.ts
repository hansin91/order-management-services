import { Module, HttpModule } from '@nestjs/common';
import { AuthService, CategoryService, GroupService } from '@services';
import { AuthController, CategoryController, GroupController } from '@controllers';

@Module({
  imports: [HttpModule],
  providers: [AuthService, CategoryService, GroupService],
  controllers: [ AuthController, CategoryController, GroupController],
})
export class AppModule {}
