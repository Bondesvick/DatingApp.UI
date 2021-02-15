import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import * as EventEmitter from 'events';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent{
  //@Inject(MAT_DIALOG_DATA) public data: DialogData
  @Input() updateSelectedRoles = new EventEmitter();
  user!: User;
  roles: any[] = [];

  constructor(private adminService: AdminService,public dialog: MatDialog, public dialogRef: MatDialogRef<RolesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { 
      this.roles = data.roles;
      this.user = data;
      //console.log(data);
    }

    editRoles(role: string){
      if(this.data.roles.includes(role)){
        this.data.roles = this.roles.filter(x => x != role)
        //console.log(this.data.roles);
        return;
      } 
      this.data.roles.push(role);

      console.log(this.roles);
    }

    updateRoles(){
      // this.updateSelectedRoles.emit(this.roles);
      // this.dialogRef.close();

      
      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
