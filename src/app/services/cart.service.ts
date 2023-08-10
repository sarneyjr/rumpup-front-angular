import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[]= [];

  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/product')
  }
  


  getCartItems(): Product[] {
    return this.products;
  }

  clearCart() {
    this.products = [];
  }

  getProduct() {
    return this.products;
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.products))
  }

  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cart_items') as 
    any) || []  ;
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }
}
