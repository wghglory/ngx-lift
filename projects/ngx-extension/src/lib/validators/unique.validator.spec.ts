import {TestBed} from '@angular/core/testing';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {UniqueValidator} from './unique.validator';

describe('UniqueValidator', () => {
  it('should validate uniqueness for FormControl in FormArray', () => {
    const fb: FormBuilder = TestBed.inject(FormBuilder);
    const formArray = fb.array([fb.control(1), fb.control(2)], [UniqueValidator.unique()]);

    expect(formArray.valid).toBeTruthy();

    // Duplicate value
    formArray.push(fb.control(2));
    expect(formArray.valid).toBeFalsy();
    expect(formArray.errors).toEqual({notUnique: true});

    // Unique value
    formArray.at(1).setValue(3);
    expect(formArray.valid).toBeTruthy();
  });

  it('should validate uniqueness for FormGroup in FormArray', () => {
    const fb: FormBuilder = TestBed.inject(FormBuilder);
    const formArray = fb.array(
      [fb.group({key: fb.control(''), value: fb.control('')})],
      [UniqueValidator.unique((control) => (control as FormGroup<{key: FormControl<string>}>).controls.key)],
    );

    expect(formArray.valid).toBeTruthy();

    // Duplicate value
    formArray.push(fb.group({key: fb.control('duplicate'), value: fb.control('v')}));
    formArray.push(fb.group({key: fb.control('duplicate'), value: fb.control('v')}));

    expect(formArray.valid).toBeFalsy();
    expect(formArray.errors).toEqual({notUnique: true});

    // Unique value
    formArray.at(1).controls.key.setValue('unique');
    expect(formArray.errors).toBeNull();
  });
});
