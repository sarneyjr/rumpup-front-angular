import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.order.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  } 

  findById(): void { 
    this.service.findById(this.order.id).subscribe(resposta => {
      this.order = resposta;
    })
  }

  update(): void {
    this.service.update(this.order).subscribe(() => {
        this.toast.success('Successfully updated order', 'Register');
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