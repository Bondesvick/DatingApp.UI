import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-bar',
  templateUrl: './success-bar.component.html',
  styleUrls: ['./success-bar.component.scss']
})
export class SuccessBarComponent implements OnInit {

  constructor(@Inject (MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
