import { Component, Input, Output, EventEmitter} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderListRes } from '../../interfaces/responses/order-list-res';
import { AccountService } from '../../services/account.service';
import { CustomerRes } from '../../interfaces/responses/customer-res';
import { ProductService } from '../../services/product.service';
import { EntryRes } from '../../interfaces/responses/entry-res';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  @Input() ratingStar: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  stars: number[] = Array(5).fill(0);

  ordersArray:any[] = [];

  customerObj:any={
    "username":"",
    "firstName":"",
    "lastName":""
  }

  saveStarObj:any={
    "productCode":"",
    "customerGivenStar":""
  }

  constructor(private orderService: OrderService , private accountService: AccountService,
    private productService: ProductService){}

  ngOnInit(): void {
    this.getOrdersForCustomer();
    this.getCustomerProfile();
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

  setRating(entry:EntryRes, star:number): void {
    this.ratingStar = star;
    this.ratingChange.emit(this.ratingStar);
    entry.product.customerGivenStar=star;
    this.saveRating(entry.product.code, star);
    
  }

  saveRating(productCode:string, star:number){
    this.saveStarObj.productCode=productCode;
    this.saveStarObj.customerGivenStar=star;
    this.productService.saveCustomerGivenStar(this.saveStarObj).subscribe((res:any)=>{
      
    })
  }

}
