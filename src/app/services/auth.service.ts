import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, pipe } from 'rxjs';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private toastr:ToastrService,private jwtHelper: JwtHelperService) { }
  apiUrl='http://localhost:8080/management-api'

  GetAll(){
    return this.http.get(this.apiUrl+'/users/get/all-pending/associates');
  }

  Proccedregister(data: any): Observable<any> {
    
    return this.http.post<any>(this.apiUrl+'/register', data, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})

  }

  handleError(error: HttpErrorResponse) {
    this.toastr.error('An error occurred:  '+error.error);
    
    
   
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  Proccedlogin(loginForm:any):Observable<any>{
    return this.http.post(this.apiUrl+'/login',loginForm);
  }

  getPendingUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl+'/users/get/all-pending/associates'); // Replace with your API endpoint
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); 
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  isLoggedOut(){
    localStorage.removeItem('token');
  }

  

}


interface User {
  id: number;
  fullName: string;
  emailAdd: string;
  address: string;
  contactNo: number;
  accountStatus: string;
  userRole: {
    roleId: number;
    roleTypes: string;
  };
}
