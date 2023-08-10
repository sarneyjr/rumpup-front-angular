import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  user: User = {
    id: '',
    email: '',
    password: '',

  }

  email: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(3)
  ]);

  password: FormControl = new FormControl(null, [
    Validators.required,
    Validators.min(0)
  ]);


  constructor(
    private service: UserService,
    private toast: ToastrService,
    private router: Router
  ) { }


  ngOnInit(): void { } 

  create(): void {
    this.service.create(this.user).subscribe(() => {
        this.toast.success('Successfully registered user', 'Register');
        this.router.navigate(['users']);
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
