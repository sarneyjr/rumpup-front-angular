import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  invalidCredentials: boolean = false;


  creds: Credentials = {
    email: '',
    password: ''
  }

  constructor( 
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  successfulLogin(authToken: string){
    localStorage.setItem('token', authToken);
    console.log(jwt_decode(authToken))
    
  }
  
  logar() {
    this.service.authenticate(this.creds).subscribe(
      (resposta: any) => { 
        this.service.successfulLogin(resposta.access_token);
        this.router.navigate(['']);
      },
      () => this.toast.error("Invalid User and/or Password")
    );
  }
}
 






