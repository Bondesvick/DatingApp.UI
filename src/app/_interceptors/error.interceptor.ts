import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '../_services/snack-bar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _snackBar: SnackBarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modalStateErrors: any[] = [];
                for(const key in error.error.errors){
                  if(error?.error?.errors[key]){
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              }
              else if (typeof(error.error) === 'object'){
                this._snackBar.openSnackBar(error?.statusText +"  " + error.status,"error");
              } else{
                this._snackBar.openSnackBar(error?.error +"  " + error.status,"error");
              }
              break;
              case 401: 
                this._snackBar.openSnackBar(error?.error + "  " + error.status,"error");
                break;

              case 404:
                this.router.navigateByUrl('/not-found');
                break;

              case 500:
                const navigationExtras: NavigationExtras = {state: {error: error?.error}}
                this.router.navigateByUrl('/server-error',navigationExtras);
                break;

              default:
                this._snackBar.openSnackBar("Something unexpected went wrong","error");
                break;
          }
        }
        return throwError(error);
      })
    );
  }
}
