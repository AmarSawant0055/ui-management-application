import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);
  displayedColumns: string[] = ['id', 'fullName', 'emailAdd', 'address', 'contactNo', 'accountStatus', 'roleTypes', 'action'];

  constructor(private service: AuthService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.service.getPendingUsers().subscribe(users => {
      this.users = users;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserModal(user: any): void {
    const dialogRef = this.dialog.open(UpdateuserComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update user data with the result
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index].accountStatus = result.accountStatus;
          this.users[index].userRole.roleTypes = result.role;
          // Add any necessary logic to save changes to the server here
        }
      }
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