import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnDestroy
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { FormControlDirective } from './form-control.directive';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {

  @Input() showSubmitErrors = false;
  @Input() errorsShownOnSubmit: string[] = ['required'];

  @ContentChild(FormControlDirective) controlDirective: FormControlDirective | undefined;

  private errorsToShow: string[] = [];
  private unsubscribe = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  public ngAfterContentInit(): void {
    this.control?.statusChanges?.pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.cdr.detectChanges());
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public get control(): NgControl | undefined {
    return this.controlDirective?.control;
  }

  public get errors(): ValidationErrors {
    return this.control?.errors || {};
  }

  public get errorKeys(): string[] {
    return this.errorsToShow;
  }

  public get isErrorVisible(): boolean {
    const errors = Object.keys(this.errors);

    if (!errors.length) {
      return false;
    }

    if (this.showSubmitErrors) {
      this.errorsToShow = errors;
      return !!this.errorsToShow.length;
    }

    this.errorsToShow = errors.filter(_err => !this.errorsShownOnSubmit.includes(_err));
    return !!this.errorsToShow.length;
  }
}
