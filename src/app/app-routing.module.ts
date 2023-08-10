import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerDeleteComponent } from './components/customer/customer-delete/customer-delete.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { CustomerUnitComponent } from './components/customer/customer-unit/customer-unit.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { OrderDeleteComponent } from './components/order/order-delete/order-delete.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderUpdateComponent } from './components/order/order-update/order-update.component';
import { OrderUnitComponent } from './components/order/order-unit/order-unit.component';
import { OrderListUnitComponent } from './components/order/order-list-unit/order-list-unit.component';
import { AddressListUnitComponent } from './components/address/address-list-unit/address-list-unit.component';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: 'users/create', component: UserCreateComponent},
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavComponent, canActivate:[AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      {path: 'products', component: ProductListComponent},
      {path: 'products/create', component: ProductCreateComponent},
      {path: 'products/update/:id', component: ProductUpdateComponent},
      {path: 'products/delete/:id', component: ProductDeleteComponent},

      {path: 'customers', component: CustomerListComponent},
      {path: 'customers/create/:userId', component: CustomerCreateComponent},
      {path: 'customers/update/:id', component: CustomerUpdateComponent},
      {path: 'customers/delete/:id', component: CustomerDeleteComponent},

      {path: 'customers/:id', component: CustomerUnitComponent},

      {path: 'customers/:id/orders', component: OrderListUnitComponent},
      {path: 'customers/:id/addresses', component: AddressListUnitComponent},
      {path: 'customers/:id/addresses/create', component: AddressCreateComponent},

      {path: 'orders', component: OrderListComponent},
      //{path: 'orders/create/:userId', component: OrderCreateComponent},
      {path: 'orders/update/:id', component: OrderUpdateComponent},
      {path: 'orders/delete/:id', component: OrderDeleteComponent},

      {path: 'orders/:id', component: OrderListComponent},

      {path: 'cart', component: CartComponent},

      {path: 'users', component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      getRole: 'ROLE_ADMIN'
    },
  },
      {path: 'users/update/:id', component: UserUpdateComponent},
      {path: 'users/delete/:id', component: UserDeleteComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }