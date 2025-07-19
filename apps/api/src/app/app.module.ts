import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
      {
        name: 'RABBIT_ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://durk:durk@localhost:5672'],
          queue: 'order_created',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'RABBIT_NOTIF_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://durk:durk@localhost:5672'],
          queue: 'notifications',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
