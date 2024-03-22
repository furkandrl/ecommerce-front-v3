import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  {
    path:'',
    component: ProductListComponent 
  },
  {
    path:'cart',
    component: CartComponent
  },
  {
    path:'product',
    component: ProductDetailComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  },
  { path: 'p/:productCode', 
    component: ProductDetailComponent 
  },
  { path: 'my-account', 
    component: MyAccountComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
