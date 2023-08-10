import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: any[] = [];

  constructor(private http: HttpClient) { }

findById(id: any): Observable<Product> {
  return this.http.get<Product>(`${API_CONFIG.baseUrl}/product/${id}`);
}

findAll(): Observable<Product[]> {
  return this.http.get<Product[]>('http://localhost:8080/product')
    .pipe(map(response => {
      const list: Product[] = response.map(product => ({ ...product }));
      return list;
    }));
}

  create(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/product', product);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${API_CONFIG.baseUrl}/product/${product.id}`, product);
  }

  delete(id: any): Observable<Product> {
    return this.http.delete<Product>(`${API_CONFIG.baseUrl}/product/${id}`);
  }



}
