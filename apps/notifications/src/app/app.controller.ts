import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // KAFKA
  @MessagePattern('order.created')
  handleOrderCreatedNotif(@Payload() order: any) {
    this.appService.orderCreatedNotif(order);
  }

  // KAFKA
  @MessagePattern('payment.succeed')
  handlePaymentSuccessNotif(@Payload() order: any) {
    this.appService.paymentSucceed(order);
  }

  //RABBIT
  @MessagePattern('order.created.rabbit')
  handleOrderCreatedNotifRabbit(@Payload() order: any) {
    this.appService.orderCreatedNotif(order);
  }

  // RABBIT
  @MessagePattern('payment.succeed.rabbit')
  handlePaymentSuccessNotifRabbit(@Payload() order: any) {
    this.appService.paymentSucceed(order);
  }
}
