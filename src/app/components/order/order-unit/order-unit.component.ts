import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-unit',
  templateUrl: './order-unit.component.html',
  styleUrls: ['./order-unit.component.css']
})
export class OrderUnitComponent {


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
      console.log(resposta);
    })
  }


}