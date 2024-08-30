import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Interface defining the options for the date range validator.
 */
interface DateRangeOptions {
  minDate?: Date | string; // Minimum allowed date
  maxDate?: Date | string; // Maximum allowed date
  minInclusive?: boolean; // Whether the comparison for the minimum date can include the exact date
  maxInclusive?: boolean; // Whether the comparison for the maximum date can include the exact date
  compareTime?: boolean; // Whether to compare the time as well. If true, comparisons will include Date time components; if false, time parts will be ignored
}

/**
 * Validates a date against a specified date range.
 *
 * @param {DateRangeOptions} options - The options for the date range validation.
 * @returns {ValidatorFn} A function that validates a FormControl and returns an error if the date is out of range.
 */
export function dateRangeValidator(options: DateRangeOptions): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Parse the selected date from the control value
    const selectedDate = new Date(control.value);

    if (isNaN(selectedDate.getTime())) {
      return {dateInvalid: true};
    }

    // If compareTime is false or undefined, ignore the time parts
    if (!options.compareTime) {
      selectedDate.setHours(0, 0, 0, 0);
    }

    const minDate = options.minDate ? new Date(options.minDate) : null;
    const maxDate = options.maxDate ? new Date(options.maxDate) : null;

    if (minDate && !options.compareTime) {
      minDate.setHours(0, 0, 0, 0);
    }
    if (maxDate && !options.compareTime) {
      maxDate.setHours(0, 0, 0, 0);
    }

    // Perform validation checks
    if (
      minDate &&
      (options.minInclusive ? selectedDate.getTime() < minDate.getTime() : selectedDate.getTime() <= minDate.getTime())
    ) {
      return {dateTooEarly: true};
    }

    if (
      maxDate &&
      (options.maxInclusive ? selectedDate.getTime() > maxDate.getTime() : selectedDate.getTime() >= maxDate.getTime())
    ) {
      return {dateTooLate: true};
    }

    return null;
  };
}
