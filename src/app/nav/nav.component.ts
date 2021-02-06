import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_modules/user';
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

  constructor(public accontService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accontService.login(this.model).subscribe(response =>{
      console.log(response)
    }, error =>{
      console.log(error);
    })
  }

  logout(){
    this.accontService.logout();
  }

}
