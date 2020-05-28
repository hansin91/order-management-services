import { Module, HttpModule } from '@nestjs/common';
import {
  AuthService,
  CategoryService,
  GroupService,
  OrderService,
  StatusService,
  ShippingService,
  PageService,
} from '@services';
import {
  AuthController,
  CategoryController,
  GroupController,
  OrderController,
  StatusController,
  ShippingController,
  PageController,
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
    PageService,
  ],
  controllers: [
    AuthController,
    CategoryController,
    GroupController,
    OrderController,
    StatusController,
    ShippingController,
    PageController,
  ],
})
export class AppModule {}
