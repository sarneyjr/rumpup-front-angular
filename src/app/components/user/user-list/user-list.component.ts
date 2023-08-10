  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator } from '@angular/material/paginator';
  import { User } from 'src/app/models/user';
  import { MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { CartService } from 'src/app/services/cart.service';
  import { UserService } from 'src/app/services/user.service';
  import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';

  @Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
  })
  export class UserListComponent implements OnInit {

    availability: string;
    userIsAdmin: boolean;

    ELEMENT_DATA: User[] = [];

    displayedColumns: string[] = [ 'email', 'password','customers','orders', 'address', 'actions'];
    dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
    pageIndex: number = 0;
    pageSize: number = 10;
    totalUsers: number = 0;

    tokenContent: any = JSON.parse(atob(localStorage.getItem('token').split(".")[1]))

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
      public dialog: MatDialog,
      private service: UserService,
      private router: Router,
      private authService: AuthService
    ) {
      this.dataSource = new MatTableDataSource<User>();
    }

    ngOnInit(): void {
      
      this.userIsAdmin = this.authService.getRole();
      
      if(this.tokenContent.authorities == 'ROLE_ADMIN'){
         this.findAll();
      }
      else{ this.findByEmail()
    }}

    findByEmail() {

      this.service.findByEmail(this.tokenContent.user_name).subscribe(resposta => {
        console.log(resposta);
        this.ELEMENT_DATA.push(resposta);
        this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
      });
    }

    // findById(): void { 
    //   this.service.findById(this.customerId).subscribe(resposta => {
    //     this.customer = resposta;
    //     console.log(resposta);
    //     this.ELEMENT_DATA = resposta.orders   
    //     this.dataSource = new MatTableDataSource<Order>(resposta.orders);
    //     localStorage.setItem('orderItem',resposta.customerName)
    //   })
    // }

    findAll() {
      this.service.findAll().subscribe(resposta => {
        console.log(resposta);
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<User>(resposta);
      });
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    maskPassword(password: string): string {
      // Sempre retornar três pontos
      return '••••••';
    }

  }
