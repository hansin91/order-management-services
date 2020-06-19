import { Module, HttpModule } from '@nestjs/common';
import {
  AuthService,
  CategoryService,
  GroupService,
  OrderService,
  StatusService,
  ShippingService,
  PageService,
  StoreService,
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
  StoreController,
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
    StoreService,
    PageService,
    ProductService,
  ],
  controllers: [
    AuthController,
    CategoryController,
    GroupController,
    OrderController,
    StatusController,
    StoreController,
    ShippingController,
    PageController,
    ProductController,
  ],
})
export class AppModule {}
