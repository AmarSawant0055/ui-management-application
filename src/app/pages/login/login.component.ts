import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private router: Router, private toastr: ToastrService, private formBuilder:FormBuilder,
    private service:AuthService
  ){}


  loginForm=this.formBuilder.group({
    email:this.formBuilder.control('',Validators.required),
    password:this.formBuilder.control('',Validators.required)
  })
  

  navigateToRegister(){
    this.toastr.info('Fill registration form');
    
    this.router.navigate(['register'])
  }

  proccessTologin(){
    if(this.loginForm.valid){
      this.service.Proccedlogin(this.loginForm.value).subscribe((resp:any) => {
       
        if(resp.status == 'FAILED'){
          this.toastr.warning('User is in a pending state')
        } else if(resp.status == 'SUCCESS'){
          const token = resp.token;
          localStorage.setItem('token', token);
          this.toastr.success('User authenticated');
          this.router.navigate(['home']);
        }
      }, error => {
        this.service.handleError(error);
      });
    } else {
      this.toastr.warning('Invalid data!');
    }
  }

  

}
