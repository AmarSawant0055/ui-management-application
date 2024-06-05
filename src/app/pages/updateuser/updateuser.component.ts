import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {

  userForm: FormGroup;
  roles: any[] = [];
  accountStatuses: string[] = ['APPROVED', 'PENDING', 'DECLINED'];

  constructor(public dialogRef: MatDialogRef<UpdateuserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: AuthService) {
    this.userForm = this.fb.group({
      fullName: [data.fullName],
      accountStatus: [data.accountStatus],
      role: [data.role]
    });

  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.service.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error fetching roles', error);
      }
    );
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    const updateDto = {
      accountStatus: this.userForm.value.accountStatus,
      role: this.userForm.value.role
    };

    this.service.updateUserRole(this.data.emailAdd, updateDto).subscribe(
      response => {
        this.dialogRef.close(this.userForm.value);
      },
      error => {
        console.error('Error updating user role', error);
      }
    );
  }

}
