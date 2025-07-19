/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092']
      },
      consumer: {
        groupId: 'payment-consumer-group'
      }
    }
  });

  const appRabbit = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
        urls: ['amqp://durk:durk@localhost:5672'],
        queue: 'payment',
        queueOptions: {
          durable: true,
        },
      },
  })

  await appRabbit.listen();
  await app.listen();
  
  Logger.log(
    `🚀 Payment Service running...`
  );
}

bootstrap();
