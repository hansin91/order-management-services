import './env';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
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
TCPBootstrap();

async function RabbitMQBootstrap() {
  const PORT = Number(process.env.RABBITMQ_PORT);
  const HOST = process.env.RABBITMQ_HOST;
  const USERNAME =  process.env.RABBITMQ_USER;
  const PASSWORD = process.env.RABBITMQ_PASSWORD;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://' + USERNAME + ':' + PASSWORD + '@' + HOST + ':' + PORT],
      queue: process.env.RABBITMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
      noAck: false,
      prefetchCount: 1,
    },
  });
  await app.listen(() => logger.log('RabbitMQ Order Microservice is listening'));
}

async function RabbitMQUploadedOrdersBootstrap() {
  const PORT = Number(process.env.RABBITMQ_PORT);
  const HOST = process.env.RABBITMQ_HOST;
  const USERNAME =  process.env.RABBITMQ_USER;
  const PASSWORD = process.env.RABBITMQ_PASSWORD;
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://' + USERNAME + ':' + PASSWORD + '@' + HOST + ':' + PORT],
      queue: process.env.RABBITMQ_UPLOADED_ORDER_QUEUE,
      queueOptions: {
        durable: false,
      },
      noAck: false,
      prefetchCount: 1,
    },
  });
  await app.listen(() => logger.log('RabbitMQ Uploaded Orders Microservice is listening'));
}

RabbitMQBootstrap();
RabbitMQUploadedOrdersBootstrap();