import { Module, HttpModule } from '@nestjs/common';
import { BullModule  } from '@nestjs/bull'
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
import { UploadConsumer, FileConsumer, OrderConsumer } from './consumer'
import { Queue } from './queue'

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot({
      ...Queue
    }),
    BullModule.registerQueue(
      {name: 'file-queue'},
      {name: 'upload-queue'},
      {name: 'order-queue'}
    ),
  ],
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
    FileConsumer,
    OrderConsumer,
    UploadConsumer
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
