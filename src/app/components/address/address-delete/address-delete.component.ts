// import { Component } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Address } from 'src/app/models/address';
// import { AddressService } from 'src/app/services/address.service';

// @Component({
//   selector: 'app-address-delete',
//   templateUrl: './address-delete.component.html',
//   styleUrls: ['./address-delete.component.css']
// })
// export class AddressDeleteComponent {

//   addressTypeArray = ['LegalPerson', 'NaturalPerson', 'Technical'];

//   address: Address;


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

//   delete(): void {
//     this.service.delete(this.address.id).subscribe(() => {
//         this.toast.success('Successfully deleted address', 'Register');
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