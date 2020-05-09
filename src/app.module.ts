import { Module, HttpModule } from '@nestjs/common';
import { AuthService, CategoryService, GroupService, OrderService } from '@services';
import { AuthController, CategoryController, GroupController, OrderController } from '@controllers';

@Module({
  imports: [HttpModule],
  providers: [AuthService, CategoryService, GroupService, OrderService],
  controllers: [ AuthController, CategoryController, GroupController, OrderController],
})
export class AppModule {}
