import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @Inject('RABBIT_ORDER_SERVICE') private readonly rabbitClientOrder: ClientProxy,
    @Inject('RABBIT_NOTIF_SERVICE') private readonly rabbitClientNotif: ClientProxy
  ) {

  }

  handleOrderKafka(order: any) {
    this.logger.log("Creating Order...");
    this.kafkaClient.emit('order.created', order);
  }

  handleOrderRabbit(order: any) {
    this.logger.log("Creating Order...");
    this.rabbitClientOrder.emit('order.created.rabbit', order);
    this.rabbitClientNotif.emit('order.created.rabbit',order);
  }
}
