import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name)
  constructor(
    private readonly appService: AppService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('order')
  handleOrderCreated(@Body() order: any) {
    this.kafkaClient.emit('order.created', order);
    
    this.logger.debug("Order Created",order);
    return order;
  }
}
