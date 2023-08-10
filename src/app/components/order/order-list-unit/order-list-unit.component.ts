import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Order } from 'src/app/models/order';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-order-list-unit',
  templateUrl: './order-list-unit.component.html',
  styleUrls: ['./order-list-unit.component.css']
})
export class OrderListUnitComponent implements OnInit {

  availability: string;

  
  ELEMENT_DATA: Order[] = [
  ];

  displayedColumns: string[] = ['id', 'items' ,'unitPrice','sellIndicator','quantity', 'discount','totalPrice'];
  dataSource = new MatTableDataSource<Order>(this.ELEMENT_DATA);
  pageIndex: number = 0;
  pageSize: number = 10;
  totalOrders: number = 0;

  order: Order;
  customer: Customer;
  customerId:number;


  discount: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);

  quantity: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);

  constructor(
    private service: CustomerService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    
  ) { }


  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.findById();
  } 

  findById(): void { 
    this.service.findById(this.customerId).subscribe(resposta => {
      this.customer = resposta;
      console.log(resposta);
      this.ELEMENT_DATA = resposta.orders   
      this.dataSource = new MatTableDataSource<Order>(resposta.orders);
      localStorage.setItem('orderItem',resposta.customerName)
    })
  }
}
