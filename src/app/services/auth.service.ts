import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  create(address: Address) {
    throw new Error('Method not implemented.');
  }

  jwtService: JwtHelperService = new JwtHelperService();
  private currentUser: User;

get token(): any {
  return localStorage.getItem('token')
}

  constructor(private http: HttpClient) {
    this.user =this.getUser(this.token)
   }



  authenticate(creds: Credentials) {
    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic cmFtcFVwOjEyMw=='),

    };
    
    let params = new HttpParams()

      .set('username', creds.email)
      .set('password', creds.password)
      .set('grant_type', 'password');

    return this.http.post('http://localhost:8080/oauth/token', params, options);
  }

  successfulLogin(authToken: string){
    localStorage.setItem('token', authToken);
  }

  isAuthenticated() {

    let token = localStorage.getItem('token')
    if (token != null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }
  
  logout() {
    localStorage.clear();
  }

  getCurrentUser(): Observable<any> {
    return of(this.currentUser);
  }

  getRole(): boolean{
    let tokenContent: any = JSON.parse(atob(localStorage.getItem('token').split(".")[1]))
    if(tokenContent.authorities == 'ROLE_ADMIN'){
      return true
    }
    return false
  }

  private getUser(token: string): User {
    return JSON.parse(atob(token.split(".")[1])) as User
  }

} 