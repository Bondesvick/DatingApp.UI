import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'https://localhost:5001/api/user';

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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private http: HttpClient) {
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

    logOut(){
      this.router.navigateByUrl("/login");
    }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.http.get(BASE_URL).subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }


  ngOnDestroy(): void {}
}
