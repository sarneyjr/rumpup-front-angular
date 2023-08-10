import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent {

  customerTypeArray = ['LegalPerson', 'NaturalPerson', 'Technical'];

  customer: Customer;

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
    private router: Router
  ) { }

  ngOnInit(): void { } 

  create(): void {
    this.service.create(this.customer).subscribe(() => {
        this.toast.success('Successfully registered customer', 'Register');
        this.router.navigate(['customers']);
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