import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Login } from '../_models/login';
import { AccountService } from '../_services/account.service';
import { SnackBarService } from '../_services/snack-bar.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent{
  // @Inject(MAT_DIALOG_DATA) public data: DialogData

  model: Login = {
    userName: "",
    passWord: ""
  };
  hide = true;

  constructor(public dialog: MatDialog, public accontService: AccountService, private router: Router,private snackBarService: SnackBarService) { }

 
  login(){
    //console.log(this.model)
    this.accontService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/members');
      this.snackBarService.openSnackBar("You have logged in","success")
    }, 
    error =>{
      this.snackBarService.openSnackBar(error.error, "error");
    }
    )
  }
}
