import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {

  stateArray = ['Active', 'Definition', 'Technical'];

  product: Product = {
    id: '',
    productName: '',
    unitPrice: 0,
    sellIndicator: false,
    state: '',
  }



  constructor(
    private service: ProductService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  } 

  findById(): void { 
    this.service.findById(this.product.id).subscribe(resposta => {
      this.product = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.product.id).subscribe(() => {
        this.toast.success('Successfully deleted product', 'Register');
        this.router.navigate(['products']);
      }, ex => {
        if (ex.error.erros) {
          ex.error.erros.array.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }
}