import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'Resource Management App';


  loginRegistration=false;

  constructor(private router:Router, private service:AuthService, private toastr:ToastrService){}
 
 
  ngDoCheck(): void {

    let currentUrl=this.router.url;

    if(currentUrl=='/login' || currentUrl=='/register' || currentUrl=='/login#!' || currentUrl=='/register#!' ||currentUrl=='/'){
      this.loginRegistration=false;

    } else{
      this.loginRegistration=true;
    }
  }

  logout(){
  
    this.service.isLoggedOut();

    this.router.navigate(['login']);

    this.toastr.success("Successfully Signed Out");

  }

}