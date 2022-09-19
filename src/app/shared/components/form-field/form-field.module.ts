import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldComponent } from './form-field.component';
import { FormControlDirective } from './form-control.directive';

@NgModule({
  declarations: [
    FormFieldComponent,
    FormControlDirective
  ],
  exports: [
    FormControlDirective,
    FormFieldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormFieldModule { }
