import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('order.created')
  handleOrderCreated(@Payload() order: any) {
    this.appService.processPayment(order)
  }

  @MessagePattern('order.created.rabbit')
  handleOrderCreatedRabbit(@Payload() order: any) {
    this.appService.rabbitProcessPayment(order)
  }
}
