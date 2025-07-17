import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('order.created')
  handleOrderCreatedNotif(@Payload() order: any) {
    this.appService.orderCreatedNotif(order);
  }

  @MessagePattern('payment.succeed')
  handlePaymentSuccessNotif(@Payload() order: any) {
    this.appService.paymentSucced(order);
  }
}
