import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validator for checking uniqueness across multiple fields in a FormArray or FormGroup.
 *
 * This validator can be applied to a FormArray or FormGroup containing the controls to be validated.
 * It ensures that each control's value is unique among all other controls within the array or group.
 */
export class UniqueValidator {
  /**
   * Validator function to be attached to each individual form control within a FormArray.
   *
   * This validator checks for uniqueness among the child controls of the FormArray.
   */
  static uniqueChild(control: AbstractControl): ValidationErrors | null {
    // Check if the parent FormArray has the 'notUnique' error
    return control.parent?.hasError('notUnique') || control.parent?.parent?.hasError('notUnique')
      ? {notUnique: true}
      : null;
  }

  /**
   * Validator function to be attached to a FormArray or FormGroup.
   *
   * This validator checks for uniqueness of each control's value within the array or group.
   *
   * @param keySelector A function to select the key control for comparison (default is the control itself).
   */
  static unique(keySelector = (control: AbstractControl) => control): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }

      const invalidControls: AbstractControl[] = [];
      const validControls: AbstractControl[] = [];
      // IMPORTANT to keep the same reference
      const uniqueChildValidator = UniqueValidator.uniqueChild;

      formArray.controls.forEach((child, index) => {
        const currentControl = keySelector(child);
        const otherChildControls = formArray.controls.filter((c, i2) => i2 !== index).map(keySelector);

        const foundDuplicatedValue = otherChildControls.some((target) => {
          return target.value !== '' && target.value === currentControl.value;
        });

        if (foundDuplicatedValue) {
          invalidControls.push(currentControl);
        } else {
          validControls.push(currentControl);
        }
      });

      // Update each child control's validity
      invalidControls.forEach((c) => {
        if (!c.hasValidator(uniqueChildValidator)) {
          c.addValidators([uniqueChildValidator]);
        }
        c.updateValueAndValidity({onlySelf: true, emitEvent: true}); // onlySelf true, otherwise this validator will never stops execution
      });

      validControls.forEach((c) => {
        if (c.hasValidator(uniqueChildValidator)) {
          c.removeValidators(uniqueChildValidator);
        }
        c.updateValueAndValidity({onlySelf: true, emitEvent: true});
      });

      return invalidControls.length > 0 ? {notUnique: true} : null;
    };
  }
}
