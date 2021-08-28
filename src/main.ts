import './env';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const logger = new Logger();

async function TCPBootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: Number(process.env.PORT),
    },
  });
  app.listen(() => logger.log('TCP Microservice is listening'));
}

async function AmpOrder() {
  const app = await NestFactory.create(AppModule)
  const PORT = Number(process.env.RABBITMQ_PORT)
  const HOST = process.env.RABBITMQ_HOST
  const USERNAME =  process.env.RABBITMQ_USER
  const PASSWORD = process.env.RABBITMQ_PASSWORD

  await app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
      urls: ['amqp://' + USERNAME + ':' + PASSWORD + '@' + HOST + ':' + PORT],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: true
      },
      noAck: false,
      prefetchCount: 1
    }
  })
  logger.log('Order Microservice is listening')
  app.startAllMicroservices()
}

async function AmpUploadFile() {
  const app = await NestFactory.create(AppModule)
  const PORT = Number(process.env.RABBITMQ_PORT)
  const HOST = process.env.RABBITMQ_HOST
  const USERNAME =  process.env.RABBITMQ_USER
  const PASSWORD = process.env.RABBITMQ_PASSWORD
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://' + USERNAME + ':' + PASSWORD + '@' + HOST + ':' + PORT],
      queue: process.env.RABBITMQ_UPLOADED_ORDER_QUEUE,
      queueOptions: {
        durable: true
      },
      noAck: false,
      prefetchCount: 1,
    }
  })
  logger.log('Upload File Microservice is listening')
  app.startAllMicroservices()
}

TCPBootstrap()
AmpOrder()
AmpUploadFile()

// async function RabbitMQOrderDetailBootstrap() {
//   const PORT = Number(process.env.RABBITMQ_PORT);
//   const HOST = process.env.RABBITMQ_HOST;
//   const USERNAME =  process.env.RABBITMQ_USER;
//   const PASSWORD = process.env.RABBITMQ_PASSWORD;
//   const app = await NestFactory.createMicroservice(AppModule, {
//     transport: Transport.RMQ,
//     options: {
//       urls: ['amqp://' + USERNAME + ':' + PASSWORD + '@' + HOST + ':' + PORT],
//       queue: process.env.RABBITMQ_ORDER_DETAIL_QUEUE,
//       queueOptions: {
//         durable: true
//         // exclusive: true,
//         // autoDelete: true
//       },
//       noAck: false,
//       prefetchCount: 1,
//     },
//   });
//   await app.listen(() => logger.log('RabbitMQ Order Detail Microservice is listening'));
// }
// RabbitMQOrderDetailBootstrap();