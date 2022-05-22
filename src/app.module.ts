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
  ReportService
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
  ReportController
} from '@controllers';
import { UploadConsumer, FileConsumer, OrderConsumer, ReportConsumer } from './consumer'
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
      {name: 'order-queue'},
      {name: 'report-queue'}
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
    ReportService,
    FileConsumer,
    OrderConsumer,
    UploadConsumer,
    ReportConsumer
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
    ReportController
  ],
})
export class AppModule {}
