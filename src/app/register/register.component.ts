import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
// @Input() usersFromHomeComponent: any;
@Output() cancelRegister = new EventEmitter();
// model: any ={}
registerForm: FormGroup = new FormGroup({});

hide = true;
minDate!: Date;
maxDate!: Date;
validationErrors: string[] = [];

  constructor(private accountService: AccountService, private _snackBar: MatSnackBar, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 18, 0, 1);
    this.maxDate = new Date(currentYear + 18, 0, 1);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      userName: ['', Validators.required],
      nickName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(response =>{
      this.router.navigateByUrl('/members');
      this.cancel();
    }, error => {
      this.validationErrors = error;
      
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
