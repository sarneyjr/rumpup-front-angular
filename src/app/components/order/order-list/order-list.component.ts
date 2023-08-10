import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/app/models/order';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  availability: string;

  
  ELEMENT_DATA: Order[] = [
  ];
  

  displayedColumns: string[] = ['id', 'items' ,'unitPrice','sellIndicator','quantity', 'discount','totalPrice'];
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);
  pageIndex: number = 0;
  pageSize: number = 10;
  totalOrders: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog, 
    private service: OrderService,
    ) {
      this.dataSource = new MatTableDataSource<Order>();
    }



  ngOnInit(): void {
    this.findAll();

  }


  findAll() {
    this.service.findAll().subscribe(resposta =>{
      console.log(resposta)
      this.ELEMENT_DATA = resposta   
      this.dataSource = new MatTableDataSource<Order>(resposta);
    })
  }  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
