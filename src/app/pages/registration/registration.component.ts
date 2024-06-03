import { Component } from '@angular/core';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
// import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private builder: FormBuilder, private toastr:ToastrService,
    private service:AuthService, private router:Router){ }



  registrationForm=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(1),Validators.maxLength(4)])),
    fullName:this.builder.control('',Validators.required),
    emailAdd:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    address:this.builder.control('',Validators.required),
    contactNo: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern(/^\d{10}$/) // Assuming a 10-digit phone number format
    ])),
    password:this.builder.control('',Validators.required),
    confirmPassword:this.builder.control('',Validators.required),
    accountStatus:this.builder.control(null),
    userRole:this.builder.control(null)
  //     "id": 103,
  //     "fullName":"amar sawant",
  //     "emailAdd":"amar@gmail.com",
  //     "address":"mumbai",
  //     "contactNo":8833225555,
  //     "password":"12345",
  //     "confirmPassword":"12345",
  //     "accountStatus":null,
  //     "userRole":null
   
  })


  processRegistration(){
    if(this.registrationForm.valid){
    
      this.service.Proccedregister(this.registrationForm.value).subscribe(res=>{
        this.toastr.success('Please contact admin for enable access','Registered Successfully');
        this.router.navigate(['login']);
      },error=>{
        this.service.handleError(error);

      }
    
    )
      
      

    } else{
      this.toastr.warning('Please enter valid data');
    }

  }
}

