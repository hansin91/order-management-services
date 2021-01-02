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
  PriceService,
  UploadedFileService,
  UploadedOrderService,
  ShopeeService,
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
  RoomController,
  RackController,
  LocationController,
  PriceController,
  UploadedOrderController,
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
    PriceService,
    UploadedFileService,
    UploadedOrderService,
    ShopeeService,
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
    RoomController,
    RackController,
    ProductController,
    PriceController,
    LocationController,
    UploadedOrderController,
  ],
})
export class AppModule {}
