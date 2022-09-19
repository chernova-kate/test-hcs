import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewTodoComponent } from './new-todo.component';
import { NewTodoRoutingModule } from './new-todo-routing.module';
import { FormFieldModule } from '../../shared/components/form-field/form-field.module';

@NgModule({
  declarations: [
    NewTodoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    NewTodoRoutingModule
  ]
})
export class NewTodoModule { }
