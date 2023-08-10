import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent {

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

  update(): void {
    this.service.update(this.customer).subscribe(() => {
        this.toast.success('Successfully updated customer', 'Register');
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