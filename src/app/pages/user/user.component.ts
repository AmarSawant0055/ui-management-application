import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(private service: AuthService) {}
  ngOnInit(): void {
    this.service.getPendingUsers().subscribe(users=>{
      this.users=users;
    })
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