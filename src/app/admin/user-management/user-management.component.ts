import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users!: Partial<User[]>;

  displayedColumns: string[] = ['username', 'roles', 'delete'];

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsersWithRoles()
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openDialog(user: any): void {
    //console.log(user);
    const dialogRef = this.dialog.open(RolesModalComponent, {
      width: '500px',
      height: '300px',
      data: {userName: user.username, roles: user.roles}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        this.adminService.updateUserRoles(result?.userName, result?.roles)
        .subscribe(() => {
          
          this.getUsersWithRoles();
        })
      }
     


    });
  }

}
