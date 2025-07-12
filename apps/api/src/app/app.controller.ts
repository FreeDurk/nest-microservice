import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    
  ) {}

  @Post('orders')
  kafkaEntry(@Body() order: any) {
    this.appService.handleOrder(order)
    return {success: true , order};
  }
}
