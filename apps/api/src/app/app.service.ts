import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

  handleOrder(order: any) {
    this.kafkaClient.emit('order.created', order);
    this.logger.debug("Order Created",order);
  }
}
