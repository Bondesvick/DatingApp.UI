import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private _snackBar: MatSnackBar) {
  }

  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map((user: User) => {
        if(user){
          return true;
        }
        this._snackBar.open('You shall not pass!!!', 'End now', {
          duration: 5000});
        return false
      })
    )
  }
  
}
