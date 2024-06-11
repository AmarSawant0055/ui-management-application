import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit, DoCheck {

  user: User[] = [];
  loggedInUserEmail = '';
  dataSource = new MatTableDataSource<User>(this.user);
  displayedColumns: string[] = ['id', 'fullName', 'emailAdd', 'address', 'contactNo', 'accountStatus', 'roleTypes', 'action'];

  constructor(private service: AuthService, public dialog: MatDialog, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(users => {
      this.user = users;
    })
  }

  ngDoCheck(): void {

    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Parse the token (if it's a JWT) to access its data
        const decodedToken = JSON.parse(atob(token.split('.')[1]));


        this.loggedInUserEmail = decodedToken.sub;

      } catch (error) {
        // Handle parsing errors (if the token is not a JWT)
        console.log('Error parsing token:', error);
        console.log('Token:', token); // Print the raw token in case of error
      }
    } else {
      console.log('No token found in local storage');
    }
    this.user;

  }






  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(email: string) {
    this.service.deleteUser(email)
      .subscribe(response => {

        console.log('User deleted successfully!'); // Add a success message
        this.toaster.success(email, 'Deleted successfully!')
      }, error => {
        console.error('Error deleting user:', error); // Log the error for debugging
        this.toaster.error('Error deleting user:', error);

      });
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