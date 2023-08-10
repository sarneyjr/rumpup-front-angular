import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  stateArray = ['Active', 'Definition', 'Technical'];

  product: Product = {
    id: '',
    productName: '',
    unitPrice: 0,
    sellIndicator: false,
    state: '',
  }

  productName: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  unitPrice: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);

  state: FormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private service: ProductService,
    private toast: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void { } 

  create(): void {
    this.service.create(this.product).subscribe(() => {
        this.toast.success('Successfully registered product', 'Register');
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

  validaCampos(): boolean {
    return this.productName.valid && this.unitPrice.valid 
      && this.state.valid;
  }
}
