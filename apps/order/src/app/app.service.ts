import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async processPayment(order: any) {
    this.kafkaClient.emit('process.payment', order);
    console.log('Emmited process payment', order);
  }
}
