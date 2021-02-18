import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

constructor(private spinner: NgxSpinnerService) { }

busy(){
  this.busyRequestCount++;
  this.spinner.show(undefined,{
    type: 'line-scale-party',
    size: "large",
    bdColor: "rgba(255, 255, 255, 0)",
    color: '#7B1FA2'
  })
}

idle(){
  this.busyRequestCount--;
  if(this,this.busyRequestCount <= 0){
    this,this.busyRequestCount = 0;
    this.spinner.hide();
  }
}

}
