/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'order-consumer-group',
        },
      },
    }
  );

  const rabbitApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://durk:durk@localhost:5672'],
        queue: 'order_created',
        queueOptions: {
          durable: true,
        },
      },
    }
  );

  const wsApp = await NestFactory.create(AppModule);

  wsApp.useWebSocketAdapter(new IoAdapter(wsApp));

  await app.listen();
  await rabbitApp.listen();
  await wsApp.listen(3001);

  Logger.log(`🚀 Order service is running...`);
}

bootstrap();
