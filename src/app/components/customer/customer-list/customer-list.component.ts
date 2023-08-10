import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Customer } from 'src/app/models/customer';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  availability: string;

  
  ELEMENT_DATA: Customer[] = [
  ];
  

  displayedColumns: string[] = ['id', 'customerName', 'documentNumber', 
  'customerStatus', 'creditScore','customerType','actions'];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);
  pageIndex: number = 0;
  pageSize: number = 10;
  totalCustomers: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog, 
    private service: CustomerService,
    ) {
      this.dataSource = new MatTableDataSource<Customer>();
    }



  ngOnInit(): void {
    this.findAll();

  }


  findAll() {
    this.service.findAll().subscribe(resposta =>{
      console.log(resposta)
      this.ELEMENT_DATA = resposta   
      this.dataSource = new MatTableDataSource<Customer>(resposta);
    })
  }  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
