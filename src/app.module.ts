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
  LocationService,
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
  WarehouseController,
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
    LocationService,
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
    WarehouseController,
    ProductController,
  ],
})
export class AppModule {}
