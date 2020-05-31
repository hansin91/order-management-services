import { Module, HttpModule } from '@nestjs/common';
import {
  AuthService,
  CategoryService,
  GroupService,
  OrderService,
  StatusService,
  ShippingService,
  PageService,
  ProductService,
} from '@services';
import {
  AuthController,
  CategoryController,
  GroupController,
  OrderController,
  StatusController,
  ShippingController,
  PageController,
  ProductController,
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
    ProductService,
  ],
  controllers: [
    AuthController,
    CategoryController,
    GroupController,
    OrderController,
    StatusController,
    ShippingController,
    PageController,
    ProductController,
  ],
})
export class AppModule {}
