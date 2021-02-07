import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
model: any ={}

@Output() toggle = new EventEmitter();
hide = true;

  constructor(public accontService: AccountService, private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(){
    this.accontService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/members');
      this.openSnackBar("You have logged in")
    }, error =>{
      this.openSnackBar(error.error);
    })
  }

  logout(){
    this.accontService.logout();
    this.router.navigateByUrl('/');
    this.openSnackBar("You have logged out")
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'End now', {
      duration: 2000
    });
  }

}
