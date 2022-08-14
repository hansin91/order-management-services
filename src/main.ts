import './env'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'

const logger = new Logger()
async function bootstrap() {
  const PORT = Number(process.env.PORT)
  const app = await NestFactory.create(AppModule)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: PORT,
    },
  })
  await app.startAllMicroservices()
  await app.listen(PORT)
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: process.env.HOST,
  //     port: PORT,
  //   },
  // })
  // app.listen(() => logger.log('TCP Microservice is listening on port '+ PORT))
}

bootstrap()