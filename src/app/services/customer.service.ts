import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/customer';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

findById(id: any): Observable<Customer> {
  return this.http.get<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);
}

  findAll(): Observable<Customer[]>{
    return this.http.get<Customer[]>('http://localhost:8080/customers')
    .pipe(map(response => 
      {
        const list = []
        for (const customer in response) {
          list.push({...response[customer]})}
        return list;
      }));
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${API_CONFIG.baseUrl}/customers/${customer.userId}`, customer);
  }



  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${API_CONFIG.baseUrl}/customers/${customer.id}`, customer);
  }

  delete(id: any): Observable<Customer> {
    return this.http.delete<Customer>(`${API_CONFIG.baseUrl}/customers/${id}`);
  }
}
