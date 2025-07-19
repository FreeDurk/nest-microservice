import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [ ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options:{
          client:{
            brokers: ['localhost:9092'],
          },
        }
      },
      {
        name: 'RABBIT_ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://durk:durk@localhost:5672'],
          queue: 'order.created.rabbit',
          queueOptions: {
            durable: true
          }
        }
      },
      {
        name: 'RABBIT_PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://durk:durk@localhost:5672'],
          queue: 'payment',
          queueOptions: {
            durable: true
          }
        }
      }
    ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
