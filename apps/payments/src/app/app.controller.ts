import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('process.payment')
  handlePaymentProcess(@Payload() order: any) {
    this.appService.paymentProcess(order);
  }
}
