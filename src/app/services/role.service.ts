import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../models/role';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

findById(id: any): Observable<Role> {
  return this.http.get<Role>(`${API_CONFIG.baseUrl}/roles/${id}`);
}

  findAll(): Observable<Role[]>{
    return this.http.get<Role[]>('http://localhost:8080/roles')
    .pipe(map(response => 
      {
        const list = []
        for (const role in response) {
          list.push({...response[role]})}
        return list;
      }));
  }

  update(role: Role): Observable<Role> {
    return this.http.patch<Role>(`${API_CONFIG.baseUrl}/roles/${role.id}`, role);
  }

  delete(id: any): Observable<Role> {
    return this.http.delete<Role>(`${API_CONFIG.baseUrl}/roles/${id}`);
  }
}
