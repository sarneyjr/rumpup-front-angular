import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

findById(id: any): Observable<Order> {
  return this.http.get<Order>(`${API_CONFIG.baseUrl}/orders/${id}`);
}

  findAll(): Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:8080/orders')
    .pipe(map(response => 
      {
        const list = []
        for (const order in response) {
          list.push({...response[order]})}
        return list;
      }));
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${API_CONFIG.baseUrl}/orders/${order.id}`, order);
  }

  update(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${API_CONFIG.baseUrl}/orders/${order.id}`, order);
  }

  delete(id: any): Observable<Order> {
    return this.http.delete<Order>(`${API_CONFIG.baseUrl}/orders/${id}`);
  }
}
