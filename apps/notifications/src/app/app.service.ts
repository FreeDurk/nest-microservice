import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  orderCreatedNotif(order: any) {
    console.log(`Order ${order.orderId} created successfully.`);
  }

  paymentSucced(order: any) {
    console.log(`Order ${order.orderId} fully paid.`);
  }
}
