import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductListComponent } from './components/product/product-list/product-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';

import { MatDialogModule } from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { ProductHeaderComponent } from './components/product/product-header/product-header.component';
import { ProductsComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';

import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio'; 

import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { CustomerDeleteComponent } from './components/customer/customer-delete/customer-delete.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { CustomerUnitComponent } from './components/customer/customer-unit/customer-unit.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { OrderCreateComponent } from './components/order/order-create/order-create.component';
import { OrderDeleteComponent } from './components/order/order-delete/order-delete.component';
import { OrderUnitComponent } from './components/order/order-unit/order-unit.component';
import { OrderUpdateComponent } from './components/order/order-update/order-update.component';
import { OrderListUnitComponent } from './components/order/order-list-unit/order-list-unit.component';
import { AddressListUnitComponent } from './components/address/address-list-unit/address-list-unit.component';
import { AddressCreateComponent } from './components/address/address-create/address-create.component';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
 
    LoginComponent,
    ProductsComponent,
    ProductHeaderComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,

    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerDeleteComponent,
    CustomerCreateComponent,
    CustomerUnitComponent,
    
    UserListComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    UserCreateComponent,

    OrderListComponent,
    OrderUnitComponent,
    OrderDeleteComponent,
    OrderUpdateComponent,
    OrderCreateComponent,
    OrderListUnitComponent,
    AddressListUnitComponent,
    AddressCreateComponent,
    CartComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),

    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSortModule,
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    CommonModule  
    
    

  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})

export class AppModule { }