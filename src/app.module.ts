import { Module, HttpModule } from '@nestjs/common';
import {
  AuthService,
  CategoryService,
  GroupService,
  OrderService,
  StatusService,
  ShippingService,
} from '@services';
import {
  AuthController,
  CategoryController,
  GroupController,
  OrderController,
  StatusController,
  ShippingController,
} from '@controllers';

@Module({
  imports: [HttpModule],
  providers: [
    AuthService,
    CategoryService,
    GroupService,
    OrderService,
    StatusService,
    ShippingService,
  ],
  controllers: [
    AuthController,
    CategoryController,
    GroupController,
    OrderController,
    StatusController,
    ShippingController,
  ],
})
export class AppModule {}
