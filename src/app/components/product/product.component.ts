import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  //styleUrls: ['./product.component.css']
})
export class ProductsComponent {
  constructor(private dialog: MatDialog) {}


}
