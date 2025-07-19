import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @Inject('RABBIT_ORDER_SERVICE') private readonly rabbitClient: ClientProxy,
    @Inject('RABBIT_PAYMENT_SERVICE') private readonly rabbitClientPayment: ClientProxy
  ) {}

  processPayment(order: any) {
    this.logger.debug('Processing Payment');
    this.kafkaClient.emit('process.payment', order);
    
  }

  rabbitProcessPayment(order: any) {
    this.logger.debug('Processing Payment...');
    this.rabbitClientPayment.emit('process.payment.rabbit', order)
  }

}
