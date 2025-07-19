import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
    private logger = new Logger(AppService.name);
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) {}

    paymentProcess(order:any) {
        this.logger.debug(`Payment processed for order ID: ${order.orderId}. Thank you!`);
        this.kafkaClient.emit('payment.succeed', order)
    }

    paymentProcessRabbit(order:any) {
        this.logger.debug(`Payment processed for order ID: ${order.orderId}. Thank you!`);
    }
}
