// import { Component } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Address } from 'src/app/models/address';
// import { AddressService } from 'src/app/services/address.service';

// @Component({
//   selector: 'app-address-update',
//   templateUrl: './address-update.component.html',
//   styleUrls: ['./address-update.component.css']
// })
// export class AddressUpdateComponent {

//   address: Address;

//   discount: FormControl = new FormControl(null, [
//     Validators.required,
//     Validators.min(0)
//   ]);

//   quantity: FormControl = new FormControl(null, [
//     Validators.required,
//     Validators.min(0)
//   ]);

//   constructor(
//     private service: AddressService,
//     private toast: ToastrService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) { }

//   ngOnInit(): void {
//     this.address.id = this.route.snapshot.paramMap.get('id');
//     this.findById();
//   } 

//   findById(): void { 
//     this.service.findById(this.address.id).subscribe(resposta => {
//       this.address = resposta;
//     })
//   }

//   update(): void {
//     this.service.update(this.address).subscribe(() => {
//         this.toast.success('Successfully updated address', 'Register');
//         this.router.navigate(['addresss']);
//       }, ex => {
//         if (ex.error.erros) {
//           ex.error.erros.array.forEach(element => {
//             this.toast.error(element.message);
//           });
//         } else {
//           this.toast.error(ex.error.message);
//         }
//       }
//     );
//   }
// }