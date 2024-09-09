import {AbstractControl, ValidationErrors} from '@angular/forms';
import {X509Certificate} from '@peculiar/x509';

export function certificateValidator(shouldDecode = false): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      try {
        new X509Certificate(shouldDecode ? atob(control.value) : control.value);
      } catch (error) {
        return {invalidCertificate: error};
      }
    }

    return null;
  };
}
