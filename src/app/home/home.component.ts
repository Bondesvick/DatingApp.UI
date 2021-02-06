import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const BASE_URL = 'https://localhost:5001/api/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

registerMode: boolean = false;
// users: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  toggleRegisterMode(){
    this.registerMode = !this.registerMode;
  }

  // getUsers(){
  //   this.http.get(BASE_URL).subscribe(users => this.users = users);
  // }

  cancelRegiterModer(event: boolean){
    this.registerMode = event;
  }

}
