import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {AlertComponent, CalloutComponent, PageContainerComponent} from 'clr-lift';
import {dateRangeValidator} from 'ngx-lift';

import {CodeBlockComponent} from '../../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../../shared/utils/highlight.util';

@Component({
  selector: 'app-date-range-validator',
  standalone: true,
  imports: [
    ClarityModule,
    ReactiveFormsModule,
    PageContainerComponent,
    AlertComponent,
    CalloutComponent,
    CodeBlockComponent,
  ],
  templateUrl: './date-range-validator.component.html',
  styleUrl: './date-range-validator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeValidatorComponent {
  today = new Date();
  fiveDaysLater = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  minDate = this.today.toISOString().split('T')[0]; // get only the date part in YYYY-MM-DD format

  minTimestamp = this.today.toISOString().slice(0, 16); // slice to ignore seconds part
  maxTimestamp = this.fiveDaysLater.toISOString().slice(0, 16);

  dateForm = new FormGroup({
    expires: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        // If you want to be more accurate, minDate should be new Date() instead of this.today
        dateRangeValidator({minDate: this.today, minInclusive: true}),
      ],
    }),
  });

  dateTimeForm = new FormGroup({
    expires: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        // If you want to be more accurate, minDate should be new Date() instead of this.today
        dateRangeValidator({minDate: this.today, maxDate: this.fiveDaysLater, compareTime: true}),
      ],
    }),
  });

  dateRangeOptionsInterface = highlight(`
interface DateRangeOptions {
  minDate?: Date | string;
  maxDate?: Date | string;
  minInclusive?: boolean;
  maxInclusive?: boolean;
  compareTime?: boolean;
}
    `);

  dateCode = highlight(`
<form clrForm [formGroup]="dateForm">
  <clr-input-container>
    <label class="clr-required-mark">Expires Date</label>
    <input type="date" clrInput [formControl]="dateForm.controls.expires" required [min]="minDate" />
    <clr-control-error *clrIfError="'required'">Required</clr-control-error>
    <clr-control-error *clrIfError="'dateTooEarly'">The date is too early</clr-control-error>
  </clr-input-container>
</form>

import {dateRangeValidator} from 'ngx-lift';

export class DateRangeValidatorComponent {
  today = new Date();
  fiveDaysLater = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  minDate = this.today.toISOString().split('T')[0]; // get only the date part in YYYY-MM-DD format

  dateForm = new FormGroup({
    expires: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        // If you want to be more accurate, minDate should be new Date() instead of this.today
        dateRangeValidator({minDate: this.today, minInclusive: true}),
      ],
    }),
  });
}
  `);

  dateTimeCode = highlight(`
<form clrForm [formGroup]="dateTimeForm">
  <clr-input-container>
    <label class="clr-required-mark">Expires Date</label>
    <input
      type="datetime-local"
      clrInput
      [formControl]="dateTimeForm.controls.expires"
      required
      [min]="minTimestamp"
      [max]="maxTimestamp"
    />
    <clr-control-error *clrIfError="'required'">Required</clr-control-error>
    <clr-control-error *clrIfError="'dateTooEarly'">The date time is too early</clr-control-error>
    <clr-control-error *clrIfError="'dateTooLate'">The date time is too late</clr-control-error>
  </clr-input-container>
</form>

import {dateRangeValidator} from 'ngx-lift';

export class DateRangeValidatorComponent {
  today = new Date();
  fiveDaysLater = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  minTimestamp = this.today.toISOString().slice(0, 16); // slice to ignore seconds part
  maxTimestamp = this.fiveDaysLater.toISOString().slice(0, 16);

  dateTimeForm = new FormGroup({
    expires: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        // If you want to be more accurate, minDate should be new Date() instead of this.today
        dateRangeValidator({minDate: this.today, maxDate: this.fiveDaysLater, compareTime: true}),
      ],
    }),
  });
}
  `);

  dateExample = highlight(`
const validator = dateRangeValidator({
  minDate: '2024-09-01', // or new Date('2024-09-01')
  maxDate: '2024-09-15',
  minInclusive: true,
  maxInclusive: false,
  compareTime: false,
});
`);

  dateTimeExample = highlight(`
const validator = dateRangeValidator({
  minDate: '2024-09-01T12:00:00Z',
  maxDate: '2024-09-02T12:00:00Z',
  compareTime: true,
});
`);
}
