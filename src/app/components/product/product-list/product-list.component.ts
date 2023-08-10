import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/models/product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  availability: string;
  userIsAdmin: boolean;

  ELEMENT_DATA: Product[] = [
  ];


  displayedColumns: string[] = ['id', 'productName', 'unitPrice', 'sellIndicator', 'state', 'actions'];
  dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
  pageIndex: number = 0;
  pageSize: number = 10;
  totalProducts: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private authService: AuthService,
    private toast: ToastrService,
    private service: ProductService,
  ) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.userIsAdmin = this.authService.getRole();
    this.findAll();

  }

  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    this.cartService.addToCart(product);
    this.toast.success('Product Added to Cart', 'Register');
  }




  findAll() {
    this.service.findAll().subscribe(resposta => {
      console.log(resposta)
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Product>(resposta);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
