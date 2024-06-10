import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  displayedColumns: string[] = ['roleID', 'roleType', 'action'];
  dataSource = new MatTableDataSource<Role>(ROLE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}


export interface Role {
  roleID: string;
  roleType: string;
}


const ROLE_DATA: Role[] = [
  { roleID: '1', roleType: 'Admin' },
  { roleID: '2', roleType: 'User' },
  // Add more roles as needed
];
