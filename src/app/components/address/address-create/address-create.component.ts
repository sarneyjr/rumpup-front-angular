import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { AddressService } from 'src/app/services/address.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],

})

export class AddressCreateComponent implements OnInit {
  addressForm: FormGroup;

  address: Address = {
    id: '',
    customerId: null, 
    street: '',
    houseNumber: '',
    neigborhood: '',
    zipCode: 0,
    country: ''
  };
  

  constructor(
    private service: AddressService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.addressForm = new FormGroup({
      customerId: new FormControl(null, Validators.required),
      street: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void { } 

  create(): void {
    if (this.addressForm.valid) {
      const address = this.addressForm.value;
      this.service.create(address).subscribe(
        () => {
          this.toast.success('Successfully registered user', 'Register');
          this.router.navigate(['address']);
        },
        ex => {
          if (ex.error.errors) {
            ex.error.errors.forEach(element => {
              this.toast.error(element.message);
            });
          } else {
            this.toast.error(ex.error.message);
          }
        }
      );
    }
  }
}


