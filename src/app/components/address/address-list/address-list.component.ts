// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { Address } from 'src/app/models/address';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { CartService } from 'src/app/services/cart.services';
// import { AddressService } from 'src/app/services/address.service';

// @Component({
//   selector: 'app-address-list',
//   templateUrl: './address-list.component.html',
//   styleUrls: ['./address-list.component.css']
// })
// export class AddressListComponent implements OnInit {

//   availability: string;

  
//   ELEMENT_DATA: Address[] = [
//   ];
  

//   displayedColumns: string[] = ['id', 'items' ,'unitPrice','sellIndicator','quantity', 'discount','totalPrice'];
//   dataSource = new MatTableDataSource<Address>(this.ELEMENT_DATA);
//   pageIndex: number = 0;
//   pageSize: number = 10;
//   totalAddresss: number = 0;

//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   constructor(
//     public dialog: MatDialog, 
//     private service: AddressService,
//     ) {
//       this.dataSource = new MatTableDataSource<Address>();
//     }



//   ngOnInit(): void {
//     this.findAll();

//   }


//   findAll() {
//     this.service.findAll().subscribe(resposta =>{
//       console.log(resposta)
//       this.ELEMENT_DATA = resposta   
//       this.dataSource = new MatTableDataSource<Address>(resposta);
//     })
//   }  

//   applyFilter(filterValue: string) {
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }
