import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = '';





  loginRegistration = false;

  constructor(private router: Router, private service: AuthService, private toastr: ToastrService) { }




  ngDoCheck(): void {



    let currentUrl = this.router.url;


    if (currentUrl == '/login' || currentUrl == '/register' || currentUrl == '/login#!' || currentUrl == '/register#!' || currentUrl == '/') {
      this.loginRegistration = false;

    } else {
      this.loginRegistration = true;
    }


    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Parse the token (if it's a JWT) to access its data
        const decodedToken = JSON.parse(atob(token.split('.')[1]));



        this.title = decodedToken.roles;

      } catch (error) {
        // Handle parsing errors (if the token is not a JWT)
        console.log('Error parsing token:', error);
        console.log('Token:', token); // Print the raw token in case of error
      }
    } else {
      console.log('No token found in local storage');
    }

  }

  logout() {

    this.service.isLoggedOut();

    this.router.navigate(['login']);

    this.toastr.success("Successfully Signed Out");

  }

  hasRole(): any {
    if (this.title == "ROLE_ADMIN")
      return false;

  }

}