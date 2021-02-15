import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { SnackBarService } from '../_services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  /**
   *
   */
  constructor(private accountService: AccountService, private snackBar: SnackBarService) {}

  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user => {
        if(user.roles.includes('Admin') || user.roles.includes('Moderator')){
          return true;
        }
        this.snackBar.openSnackBar("You cannot enter this area", "error");
        return false;
      })
    )
  }
  
}
