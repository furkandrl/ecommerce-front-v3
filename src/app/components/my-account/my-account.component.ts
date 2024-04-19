import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderListRes } from '../../interfaces/responses/order-list-res';
import { AccountService } from '../../services/account.service';
import { CustomerRes } from '../../interfaces/responses/customer-res';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  ordersArray:any[] = [];

  customerObj:any={
    "username":"",
    "firstName":"",
    "lastName":""
  }

  constructor(private orderService: OrderService , private accountService: AccountService){}

  ngOnInit(): void {
    this.getOrdersForCustomer();
  }

  showDetails:boolean = false;

  toggleDetails(order:any): void {
    order.showDetails = !order.showDetails;
  }

  getOrdersForCustomer(){
    this.orderService.getAllOrdersOfCustomer().subscribe((res: OrderListRes) =>{
      this.ordersArray = res.orders;
      
  })
  }

  getCustomerProfile(){
    this.accountService.getCustomerProfile().subscribe((res: CustomerRes) =>{
      this.customerObj.username = res.username;
      this.customerObj.firstName = res.firstName;
      this.customerObj.lastName = res.lastName;
    })
  }

}
