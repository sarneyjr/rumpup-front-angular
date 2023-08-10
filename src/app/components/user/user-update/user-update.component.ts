import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  } 

  findById(): void { 
    this.service.findById(this.user.id).subscribe(resposta => {
      this.user = resposta;
    })
  }

  update(): void {
    this.service.update(this.user).subscribe(() => {
        this.toast.success('Successfully updated user', 'Register');
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
  
  maskPassword(password: string): string {
    // Sempre retornar três pontos
    return '•••';
  }
}