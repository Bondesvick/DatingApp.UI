import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { User } from './_modules/user';
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

  constructor(private accountService: AccountService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  this.mobileQuery.addListener(this._mobileQueryListener);
   }

   links =[
     {path: "/home", icon: "home", title: "Home"},
     {path: "/items", icon: "view_list", title: "Courses"},
     {path: "/bookitems", icon: "book", title: "Books"},
     {path: "/users", icon: "person", title: "Users"}
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
