import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective {

  focused = false;

  @HostListener('focus')
  public onFocus(): void {
    this.focused = true;
  }

  @HostListener('focusout')
  public onFocusOut(): void {
    this.focused = false;
  }

  constructor(
    public control: NgControl
  ) {
  }

}
