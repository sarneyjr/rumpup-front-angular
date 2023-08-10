import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  displayedColumns: string[] = ['productName', 'unitPrice', 'sellIndicator', 'state', 'repetitionCount', 'subTotal'];
  displayedColumnsTotal: string[] = ['total'];

  couponCode: string = '';
  discountAmount: number = 0;

  products: any[] = [];
  subTotal!: any;
  itemCounter: { [itemId: number]: number } = {};

  cartContent: any = JSON.parse(localStorage.getItem('cart_items'))

  finalList: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private toast: ToastrService
    ) { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('cart_items')) || [];
    this.createFinalList();

    

  }

  createFinalList() {
    const cartItems = JSON.parse(localStorage.getItem('cart_items'));

    // Clear existing counts
    this.itemCounter = {};

    for (const item of cartItems) {
      if (!this.itemCounter[item.id]) {
        this.itemCounter[item.id] = 1; // Initialize the counter for the item
        this.finalList.push(item); // Add the item to the finalList

      } else {
        this.itemCounter[item.id] += 1; // Increment the counter for repeated items
      }
    }

    console.log(this.itemCounter); // This will show how many times each item is repeated
  }

  repetitionCount(itemId: number): number {
    return this.itemCounter[itemId];
  }

  calculateSubtotalForItem(item: any): number {
    const itemCount = this.itemCounter[item.id];
    return itemCount * item.unitPrice;
  }

  calculateTotal(): number {
    let total = 0;
  
    for (const item of this.finalList) {
      total += this.calculateSubtotalForItem(item);
    }
  
    if (this.couponCode === 'MEUCUPOM') { // Substitua 'MEUCUPOM' pelo código do seu cupom
      total = total*(1 - this.discountAmount);
    }
  
    return total;
  }
  
  applyCoupon() {
    if (this.couponCode === 'MEUCUPOM') { // Substitua 'MEUCUPOM' pelo código do seu cupom
      this.discountAmount = 0.05; // Substitua pelo valor do desconto que você deseja aplicar
      this.toast.success('Discount applied successfully', 'Discount');
      localStorage.setItem('coupon_discount', JSON.stringify(this.discountAmount));

    } else {
      this.discountAmount = 0;
      this.toast.error('This coupon does not exist', 'Discount');
      localStorage.setItem('coupon_discount', JSON.stringify(this.discountAmount));
    }
  }
  
  

    removeFromCart(product: any) {
      this.cartService.removeProduct(product);
      this.products = this.cartService.getProduct();
    }

    checkout() {
      const total = this.calculateTotal(); // Calculate the total price
      localStorage.setItem('cart_total', JSON.stringify(total));
      this.router.navigate(['/payment']);
    }
    
}
