import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {


  order: Order;

  discount: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);

  quantity: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);

  constructor(
    private service: OrderService,
    private toast: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void { } 

  create(): void {
    this.service.create(this.order).subscribe(() => {
        this.toast.success('Successfully registered order', 'Register');
        this.router.navigate(['orders']);
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
