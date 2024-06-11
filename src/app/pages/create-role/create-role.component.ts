import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  userRole: UserRole[] = [];

  dataSource = new MatTableDataSource<UserRole>(this.userRole);

  displayedColumns: string[] = ['roleId', 'roleTypes', 'action'];

  constructor(private service: AuthService, public dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.service.getRoles().subscribe(userRoless => {
      this.userRole = userRoless;

    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateRoleModal(userRole: any): void {

  }



}


interface UserRole {
  roleId: number;
  roleTypes: string;

}


// user: User[] = [];
// dataSource = new MatTableDataSource<User>(this.user);
// displayedColumns: string[] = ['id', 'fullName', 'emailAdd', 'address', 'contactNo', 'accountStatus', 'roleTypes', 'action'];

// constructor(private service: AuthService, public dialog: MatDialog) { }
// ngOnInit(): void {
//   this.service.getPendingUsers().subscribe(users => {
//     this.user = users;
//   })
// }

// applyFilter(event: Event) {
//   const filterValue = (event.target as HTMLInputElement).value;
//   this.dataSource.filter = filterValue.trim().toLowerCase();

//   if (this.dataSource.paginator) {
//     this.dataSource.paginator.firstPage();
//   }
// }

// openUserModal(user: any): void {
//   const dialogRef = this.dialog.open(UpdateuserComponent, {
//     width: '500px',
//     data: user
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       // Update user data with the result
//       const index = this.user.findIndex(u => u.id === user.id);
//       if (index !== -1) {
//         this.user[index].accountStatus = result.accountStatus;
//         this.user[index].userRole.roleTypes = result.role;
//         // Add any necessary logic to save changes to the server here
//       }
//     }
//   });
// }


// }

// {
//   "roleId": 503,
//   "roleTypes": "ROLE_ADMIN"
// },

// interface User {
// id: number;
// fullName: string;
// emailAdd: string;
// address: string;
// contactNo: number;
// accountStatus: string;
// userRole: {
//   roleId: number;
//   roleTypes: string;
// };
// }