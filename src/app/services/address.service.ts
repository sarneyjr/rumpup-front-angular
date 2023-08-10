import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Address } from '../models/address';
import { API_CONFIG } from '../config/api.config';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

findById(id: any): Observable<Address> {
  return this.http.get<Address>(`${API_CONFIG.baseUrl}/address/${id}`);
}

  findAll(): Observable<Address[]>{
    return this.http.get<Address[]>('http://localhost:8080/address')
    .pipe(map(response => 
      {
        const list = []
        for (const address in response) {
          list.push({...response[address]})}
        return list;
      }));
  }

  create(address: Address): Observable<Address> {
    return this.http.post<Address>(`${API_CONFIG.baseUrl}/customers/${address.customerId}/addresses`, address);
  }

  // update(address: Address): Observable<Address> {
  //   return this.http.patch<Address>(`${API_CONFIG.baseUrl}/address/${address.id}`, address);
  // }

  // delete(id: any): Observable<Address> {
  //   return this.http.delete<Address>(`${API_CONFIG.baseUrl}/address/${id}`);
  // }
}
