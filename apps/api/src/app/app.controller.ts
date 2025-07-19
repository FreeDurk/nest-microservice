import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    
  ) {}

  @Post('kafka/orders')
  kafkaEntry(@Body() order: any) {
    this.appService.handleOrderKafka(order)
    return {success: true , order};
  }

  @Post('rabbit/orders')
  rabbitEntry(@Body() order: any) {
    this.appService.handleOrderRabbit(order)
    return {success: true , order:order};
  }

}
