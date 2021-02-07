import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
// @Input() usersFromHomeComponent: any;
@Output() cancelRegister = new EventEmitter();

model: any ={}

  constructor(private accountService: AccountService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  register(){
    this.accountService.register(this.model).subscribe(response =>{
      this.openSnackBar("Your account has been created, and you have logged in");
      this.cancel();
    }, error => {
      this.openSnackBar(error.error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'End now', {
      duration: 2000
    });
  }
}
