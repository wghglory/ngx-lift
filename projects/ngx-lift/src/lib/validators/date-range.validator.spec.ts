import {FormControl} from '@angular/forms';

import {dateRangeValidator} from './date-range.validator';

describe('dateRangeValidator', () => {
  it('should validate date when no range is specified', () => {
    const control = new FormControl(new Date(), dateRangeValidator({}));

    control.updateValueAndValidity();

    expect(control.errors).toBeNull();
  });

  it('should mark date as invalid if it is not a valid date', () => {
    const control = new FormControl('invalid-date', dateRangeValidator({}));

    control.updateValueAndValidity();

    expect(control.errors).toEqual({dateInvalid: true});
  });

  it('should validate date within the specified range', () => {
    const control = new FormControl(
      new Date('2024-09-07'),
      dateRangeValidator({
        minDate: '2024-09-01',
        maxDate: '2024-09-15',
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toBeNull();
  });

  it('should fail validation if date is before the minimum date', () => {
    const control = new FormControl(
      new Date('2024-08-31'),
      dateRangeValidator({
        minDate: '2024-09-01',
        minInclusive: true,
      }),
    );
    control.updateValueAndValidity();

    expect(control.errors).toEqual({dateTooEarly: true});
  });

  it('should pass validation if date is on the minimum date and inclusive is true', () => {
    const control = new FormControl(
      new Date('2024-09-01'),
      dateRangeValidator({
        minDate: '2024-09-01',
        minInclusive: true,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toBeNull();
  });

  it('should fail validation if date is on the minimum date and inclusive is false', () => {
    const control = new FormControl(
      new Date('2024-09-01'),
      dateRangeValidator({
        minDate: '2024-09-01',
        minInclusive: false,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toEqual({dateTooEarly: true});
  });

  it('should fail validation if date is after the maximum date', () => {
    const control = new FormControl(
      new Date('2024-09-02'),
      dateRangeValidator({
        maxDate: '2024-09-01',
        maxInclusive: true,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toEqual({dateTooLate: true});
  });

  it('should pass validation if date is on the maximum date and inclusive is true', () => {
    const control = new FormControl(
      new Date('2024-09-01'),
      dateRangeValidator({
        maxDate: '2024-09-01',
        maxInclusive: true,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toBeNull();
  });

  it('should fail validation if date is on the maximum date and inclusive is false', () => {
    const control = new FormControl(
      new Date('2024-09-01'),
      dateRangeValidator({
        maxDate: '2024-09-01',
        maxInclusive: false,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toEqual({dateTooLate: true});
  });

  it('should ignore time parts when compareTime is false', () => {
    const control = new FormControl(
      new Date('2024-09-01T11:59:59Z'),
      dateRangeValidator({
        minDate: '2024-09-01T12:00:00Z',
        maxDate: '2024-09-02T12:00:00Z',
        compareTime: false,
        minInclusive: true,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toBeNull();
  });

  it('should consider time parts when compareTime is true', () => {
    const control = new FormControl(
      new Date('2024-09-01T11:59:59Z'),
      dateRangeValidator({
        minDate: '2024-09-01T12:00:00Z',
        maxDate: '2024-09-02T12:00:00Z',
        compareTime: true,
      }),
    );

    control.updateValueAndValidity();

    expect(control.errors).toEqual({dateTooEarly: true});
  });
});
