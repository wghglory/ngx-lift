import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';

import {intersectionValidator} from './intersection.validator';

describe('intersectionValidator', () => {
  let formGroup: FormGroup;
  let validator: ValidatorFn;

  beforeEach(() => {
    validator = intersectionValidator('field1', 'field2');

    formGroup = new FormGroup({
      field1: new FormControl([]),
      field2: new FormControl([]),
    });
  });

  it('should return null when no intersection exists', () => {
    formGroup.get('field1')!.setValue(['apple', 'banana']);
    formGroup.get('field2')!.setValue(['orange', 'grape']);

    const result = validator(formGroup);

    expect(result).toBeNull();
  });

  it('should return an error when an intersection exists', () => {
    formGroup.get('field1')!.setValue(['apple', 'banana']);
    formGroup.get('field2')!.setValue(['banana', 'orange']);

    const result = validator(formGroup);

    expect(result).toEqual({intersection: true});
  });

  it('should return null when one of the controls is missing', () => {
    formGroup = new FormGroup({
      field1: new FormControl(['apple', 'banana']),
    });

    const result = validator(formGroup);

    expect(result).toBeNull();
  });

  it('should return null when one of the controls is not an array', () => {
    formGroup = new FormGroup({
      field1: new FormControl('apple'),
      field2: new FormControl(['orange', 'grape']),
    });

    const result = validator(formGroup);

    expect(result).toBeNull();
  });
});
