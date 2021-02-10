import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-imput',
  templateUrl: './text-imput.component.html',
  styleUrls: ['./text-imput.component.scss']
})
export class TextImputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type!: 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  writeValue(obj: any): void {
    
  }

  registerOnChange(fn: any): void {
    
  }

  registerOnTouched(fn: any): void {
    
  }

}
