import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-unit',
  templateUrl: './customer-unit.component.html',
  styleUrls: ['./customer-unit.component.css']
})
export class CustomerUnitComponent {

  customerTypeArray = ['LegalPerson', 'NaturalPerson', 'Technical'];

  customer: Customer = {
    id: '',
    userId: 0,
    customerName: '',
    documentNumber: 0,
    customerStatus: '',
    creditScore: '',
    customerType: '',
    orders: [],
    address: []
  }

  customerName: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  documentNumber: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);

  customerStatus: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3)
  ]);

  creditScore: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3)
  ]);


  customerType: FormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private service: CustomerService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit(): void {
    this.customer.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  } 

  findById(): void { 
    this.service.findById(this.customer.id).subscribe(resposta => {
      this.customer = resposta;
    })
  }


}