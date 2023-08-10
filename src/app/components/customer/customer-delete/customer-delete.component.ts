import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent {

  customerTypeArray = ['LegalPerson', 'NaturalPerson', 'Technical'];

  customer: Customer;

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

  delete(): void {
    this.service.delete(this.customer.id).subscribe(() => {
        this.toast.success('Successfully deleted customer', 'Register');
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