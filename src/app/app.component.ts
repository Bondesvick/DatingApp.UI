import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'dating-app';

  users: any;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public accountService: AccountService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
   }

   links =[
     {path: "/", icon: "home", title: "Home", roles: ["Admin","Member"]},
     {path: "/members", icon: "people", title: "Members", roles: ["Admin","Member"]},
     {path: "/lists", icon: "view_list", title: "Lists", roles: ["Admin","Member"]},
     {path: "/messages", icon: "message", title: "Messages", roles: ["Admin","Member"]},
     {path: "/admin", icon: "admin_panel_settings", title: "Admin", roles: ["Admin","Moderator"]},
    ]

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }

  ngOnDestroy(): void {}
}
