import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent {

  orderTypeArray = ['LegalPerson', 'NaturalPerson', 'Technical'];

  order: Order;


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

  delete(): void {
    this.service.delete(this.order.id).subscribe(() => {
        this.toast.success('Successfully deleted order', 'Register');
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