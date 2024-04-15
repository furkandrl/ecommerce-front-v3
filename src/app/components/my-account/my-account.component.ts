import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderListRes } from '../../interfaces/responses/order-list-res';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  ordersArray:any[] = [];

  constructor(private orderService: OrderService ){}

  ngOnInit(): void {
    this.getOrdersForCustomer();
  }

  showDetails:boolean = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  getOrdersForCustomer(){
    this.orderService.getAllOrdersOfCustomer().subscribe((res: OrderListRes) =>{
      this.ordersArray = res.orders;
      
  })
  }

}
