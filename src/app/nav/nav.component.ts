import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
model: any ={}

@Output() toggle = new EventEmitter();
hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.model)
    this.model = {}
  }

}
