import './env'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger()
  const PORT = Number(process.env.PORT)
  const NATS_PORT = Number(process.env.NATS_PORT)
  const NATS_USERNAME = process.env.NATS_USERNAME
  const NATS_PASSWORD = process.env.NATS_PASSWORD
  const HOST = process.env.HOST
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: PORT
    },
  })

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${HOST}:${NATS_PORT}`],
      user: `${NATS_USERNAME}`,
      pass: `${NATS_PASSWORD}`
    },
  })

  await app.startAllMicroservices()
  await app.listen(3003, () => logger.log('Microservices are listening on port '+ 3003))
}

bootstrap()