import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ErrorBarComponent } from '../_snackbars/error-bar/error-bar.component';
import { SuccessBarComponent } from '../_snackbars/success-bar/success-bar.component';

@Injectable({
  providedIn: 'root'
}) 
export class SnackBarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

constructor(private _snackBar: MatSnackBar) {
 }

 openSnackBar(message: any, status: string) {
    
  switch(status){
    case "error":
      this._snackBar.openFromComponent(ErrorBarComponent,{
        data: message,
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      break;

    case "success":
      this._snackBar.openFromComponent(SuccessBarComponent,{
        data: message,
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      break;

      default:
        this._snackBar.openFromComponent(SuccessBarComponent,{
          data: message,
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      break;
  }
 }
}
