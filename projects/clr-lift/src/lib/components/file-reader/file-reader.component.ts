import {CommonModule} from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import {ClarityModule} from '@clr/angular';

import {TranslatePipe} from '../../pipes/translate.pipe';
import {TranslationService} from '../../services/translation.service';
import {fileReaderTranslations} from './file-reader.l10n';

@Component({
  selector: 'cll-file-reader',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ClarityModule, FormsModule],
  templateUrl: './file-reader.component.html',
  styleUrls: ['./file-reader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileReaderComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileReaderComponent),
      multi: true,
    },
  ],
})
export class FileReaderComponent implements ControlValueAccessor, Validator, OnInit {
  private injector = inject(Injector);
  private translationService = inject(TranslationService);

  @ViewChild('file') fileElement!: ElementRef<HTMLInputElement>;
  controlId = input('');
  acceptFiles = input('*');
  encoded = input(false); // read file content as base64
  maxSize = input(Infinity);
  disabled = input(false);

  isDisabled = signal(this.disabled());

  @Output() fileChange = new EventEmitter<string>();

  // @Input({ required: true }) formControl: FormControl;
  formControl?: FormControl;

  selectedFile?: File;
  parseError = '';
  rawContent = '';
  encodedContent = '';

  constructor() {
    this.translationService.loadTranslationsForComponent('FileReader', fileReaderTranslations);
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get sizeInvalid() {
    if (!this.selectedFile) {
      return false;
    }
    return this.selectedFile.size > this.maxSize() * 1024 * 1024;
  }

  onFileSelected(event: Event) {
    this.parseError = '';

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFile = selectedFile;

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const fileReader = e.target as FileReader;
        const fileContent = fileReader.result as string;

        this.rawContent = fileContent;
        try {
          this.encodedContent = btoa(fileContent);
          const content = this.encoded() ? this.encodedContent : this.rawContent;
          this.onChange(content); // Notify the form control
          this.onTouched();

          this.fileChange.emit(content);
        } catch (error) {
          this.parseError = (error as Error).message;
          this.onChange(' '); // use 1 space string to avoid required error, onChange will trigger validate method
          this.onTouched();
        }
      };

      reader.readAsText(selectedFile);
    }
  }

  removeFile() {
    this.fileElement.nativeElement.value = '';
    this.selectedFile = undefined;
    this.rawContent = '';
    this.encodedContent = '';
    this.onChange('');
    this.onTouched();
  }

  // value passed from new FormControl()
  writeValue(value: string) {
    if (!value) {
      return;
    }

    if (this.encoded()) {
      this.encodedContent = value;
      this.rawContent = atob(value);
    } else {
      this.rawContent = value;
      this.encodedContent = btoa(value);
    }
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled.set(isDisabled);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.sizeInvalid) {
      return {exceedLimit: true};
    }
    if (this.parseError) {
      return {parse: this.parseError};
    }

    return null;
  }

  ngOnInit() {
    const ngControl = this.injector.get(NgControl);

    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector.get(FormGroupDirective).getControl(ngControl);
    } else {
      this.formControl = (ngControl as FormControlDirective).form as FormControl;
    }
  }
}
