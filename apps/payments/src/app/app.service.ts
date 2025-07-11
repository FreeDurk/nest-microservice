import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

    paymentProcess(order:any) {
        console.log("Payment process", order);
        console.log('Payment Succeed')
        this.kafkaClient.emit('payment.succeed', order)
    }
}
