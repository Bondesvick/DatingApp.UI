import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Login } from '../_models/login';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { ErrorBarComponent } from '../_snackbars/error-bar/error-bar.component';
import { SuccessBarComponent } from '../_snackbars/success-bar/success-bar.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
model: Login = {
  userName: "",
  passWord: ""
};

@Output() toggle = new EventEmitter();
hide = true;
//user!: User;

  constructor(public dialog: MatDialog, public accontService: AccountService, private router: Router,private snackBarService: SnackBarService) { }

  ngOnInit(){
    
  }

  openDialog(): void {
    this.dialog.open(LoginDialogComponent);
  }
  
  

  login(){
    this.accontService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/members');
      this.snackBarService.openSnackBar("You have logged in","success")
    }, 
    // error =>{
    //   this.snackBarService.openSnackBar(error.error, "error");
    // }
    )
  }

  logout(){
    this.accontService.logout();
    this.router.navigateByUrl('/');
    this.snackBarService.openSnackBar("You have logged out", "success")
  }

}
