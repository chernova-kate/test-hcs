import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoPriority } from '../../shared/enums/todo-priority';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTodoComponent {

  isLoading = false;
  todoForm: FormGroup;
  TodoPriority = TodoPriority;

  constructor(
    private appService: AppService,
    private router: Router
  ) {
    this.todoForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'date': new FormControl(null, [Validators.required]),
      'priority': new FormControl(TodoPriority.NORMAL)
    })
  }

  public onSubmit(): void {
    if (this.todoForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    const { title, date, priority } = this.todoForm.value;

    this.appService.todos.next([...this.appService.todos.value, {
      title,
      date: +new Date(date),
      priority,
      done: false
    }]);

    this.router.navigate(['/']).then(() => this.isLoading = false);
  }

}
