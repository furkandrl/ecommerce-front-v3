import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderListRes } from '../../interfaces/responses/order-list-res';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  


  constructor(private orderService: OrderService){}

  getOrdersOfCustomer(){
    this.orderService.getAllOrdersOfCustomer().subscribe((res: OrderListRes) =>{

    })
  }


}
