import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

findById(id: any): Observable<User> {
  return this.http.get<User>(`${API_CONFIG.baseUrl}/users/${id}`);
}

findByEmail(email: any): Observable<User> {
  return this.http.get<User>(`${API_CONFIG.baseUrl}/users/email/${email}`);
}

findAll(): Observable<User[]>{
  return this.http.get<User[]>('http://localhost:8080/users')
  .pipe(map(response => 
    {
      const list = []
      for (const user in response) {
        list.push({...response[user]})}
      return list;
    }));
}

  create(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/users/signup', user);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${API_CONFIG.baseUrl}/users/${user.id}`, user);
  }

  delete(id: any): Observable<User> {
    return this.http.delete<User>(`${API_CONFIG.baseUrl}/users/${id}`);
  }
}
