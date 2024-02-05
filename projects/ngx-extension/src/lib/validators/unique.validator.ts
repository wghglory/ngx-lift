import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validator for checking uniqueness across multiple fields in a FormArray or FormGroup.
 *
 * This validator can be applied to a FormArray or FormGroup containing the controls to be validated.
 * It ensures that each control's value is unique among all other controls within the array or group.
 */
export class UniqueValidator {
  /**
   * Validator function to be attached to a FormArray or FormGroup.
   *
   * This validator checks for uniqueness of each control's value within the array or group.
   *
   * @param keySelector A function to select the key control for comparison (default is the control itself).
   */
  static unique<T>(
    keySelector: (control: AbstractControl) => AbstractControl<T> = (control: AbstractControl<T>) => control,
  ): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }

      const targetControls = formArray.controls.map(keySelector);
      const valueControlMap = new Map<T, AbstractControl<T>>();
      const invalidControls: AbstractControl[] = [];

      for (const c of targetControls) {
        const value = c.value;

        if (value === '') {
          continue;
        }

        const controlInMap = valueControlMap.get(value);

        if (controlInMap) {
          if (!invalidControls.includes(controlInMap)) {
            invalidControls.push(controlInMap);
          }

          invalidControls.push(c);
        } else {
          valueControlMap.set(value, c);
        }
      }

      const notUniqueError = {notUnique: true};

      // Update each child control's validity
      for (const c of targetControls) {
        const errors = c.errors;

        if (invalidControls.includes(c)) {
          c.setErrors(errors === null ? notUniqueError : {...errors, ...notUniqueError});
        } else {
          if (errors === null) {
            c.setErrors(null);
          } else {
            delete errors['notUnique'];
            c.setErrors(Object.keys(errors).length > 0 ? errors : null);
          }
        }
      }

      return invalidControls.length > 0 ? notUniqueError : null;
    };
  }
}
