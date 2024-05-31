import {CommonModule} from '@angular/common';
import {Component, computed, EventEmitter, inject, input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {UniqueValidator} from 'ngx-lift';

import {TranslatePipe} from '../../pipes/translate.pipe';
import {TranslationService} from '../../services/translation.service';
import {keyValueTranslations} from './key-value.l10n';
import {KeyValueFormGroup} from './key-value-form-group.type';

@Component({
  selector: 'cll-key-value-inputs',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ClarityModule, ReactiveFormsModule],
  templateUrl: './key-value-inputs.component.html',
  styleUrls: ['./key-value-inputs.component.scss'],
})
export class KeyValueInputsComponent implements OnInit {
  private translationService = inject(TranslationService);
  private fb = inject(NonNullableFormBuilder);

  formArray = input.required<FormArray<KeyValueFormGroup>>();
  data = input<{key: string; value: string}[]>([]);
  uniqueKey = input(true);
  keyHelper = input('');
  valueHelper = input('');
  inputSize = input(40);
  isSmallButton = input(true);
  _addText = input('', {alias: 'addText'});

  addText = computed(() => this._addText() || this.translationService.translate('key-value.add'));

  @Output() removeKeyValue = new EventEmitter<number>();
  @Output() addKeyValue = new EventEmitter<void>();

  constructor() {
    this.translationService.loadTranslationsForComponent('key-value', keyValueTranslations);
  }

  removeKeyValuePair(index: number) {
    this.formArray().removeAt(index);
    this.validateAllKeyControls();
    this.removeKeyValue.emit(index);
  }

  addKeyValuePair() {
    const group = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.formArray().push(group);
    this.addKeyValue.emit();
  }

  _validateKeyControl(index: number) {
    this.formArray().controls[index].controls.key.updateValueAndValidity();
  }
  validateKeyControl(control: AbstractControl) {
    control.updateValueAndValidity();
  }

  ngOnInit() {
    this.addUniqueKeyValidator();

    this.initializeFormData();
  }

  private validateAllKeyControls() {
    this.formArray().controls.forEach((group) => {
      group.controls.key.updateValueAndValidity();
    });
  }

  private addUniqueKeyValidator() {
    if (this.uniqueKey()) {
      const selector = (control: AbstractControl): AbstractControl =>
        (control as FormGroup<{key: FormControl<string>}>).controls.key;

      this.formArray().addValidators(UniqueValidator.unique(selector));

      this.formArray().updateValueAndValidity();
    }
  }

  private initializeFormData() {
    if (this.data().length > 0) {
      this.data().forEach((prop) => {
        this.formArray().push(
          this.fb.group({
            key: [prop.key || '', Validators.required],
            value: [prop.value || '', Validators.required],
          }),
        );
      });
    }
  }
}
