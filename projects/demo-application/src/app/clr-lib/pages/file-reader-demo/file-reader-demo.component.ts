import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClarityModule} from '@clr/angular';
import {
  CertificateSignpostComponent,
  certificateValidator,
  FileReaderComponent,
  PageContainerComponent,
} from 'clr-lift';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-file-reader-demo',
  standalone: true,
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    CertificateSignpostComponent,
    FileReaderComponent,
    PageContainerComponent,
    CodeBlockComponent,
  ],
  templateUrl: './file-reader-demo.component.html',
  styleUrl: './file-reader-demo.component.scss',
})
export class FileReaderDemoComponent {
  form = new FormGroup({
    caCert: new FormControl('', [certificateValidator(), Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  certAcceptedFiles = '.pem, .cer, .key';
  certFileLimit = 5; // MB

  onFileChange(content: string) {
    console.log(content);
  }

  submit() {
    console.log(this.form.value);
  }

  htmlCode = highlight(`
<form clrForm [formGroup]="form" (ngSubmit)="submit()">
    <clr-control-container>
      <label for="ca-bundle">CA Bundle</label>
      <cll-file-reader
        controlId="ca-bundle"
        clrControl
        [encoded]="false"
        [maxSize]="certFileLimit"
        [acceptFiles]="certAcceptedFiles"
        [formControl]="form.controls.caCert"
        (fileChange)="onFileChange($event)"
      />
      <clr-control-success *ngIf="form.controls.caCert.value">
        Show certificate:
        <cll-certificate-signpost
          *ngIf="form.controls.caCert.valid"
          [pem]="form.controls.caCert.value"
          [pemEncoded]="false"
          [showIcon]="true"
          [position]="'bottom-right'"
        />
      </clr-control-success>
      <clr-control-error *clrIfError="'exceedLimit'">
        Exceed the maximum file size ({{ certFileLimit }} MB).
      </clr-control-error>
      <clr-control-error *clrIfError="'invalidCertificate'"> Cannot parse the file correctly </clr-control-error>
      <clr-control-error *clrIfError="'required'"> Required </clr-control-error>
    </clr-control-container>

    <clr-control-container>
      <label for="file">File</label>
      <cll-file-reader controlId="file" clrControl [encoded]="false" [formControl]="form.controls.file" />
      <clr-control-success *ngIf="form.controls.file.value">
        File content has been read successfully
      </clr-control-success>
      <clr-control-error *clrIfError="'parse'; error as error"> {{ error }} </clr-control-error>
      <clr-control-error *clrIfError="'required'"> Required </clr-control-error>
    </clr-control-container>

    <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Submit</button>
  </form>
  `);

  tsCode = highlight(`
import {CertificateSignpostComponent, certificateValidator, FileReaderComponent} from 'clr-lift';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    CertificateSignpostComponent,
    FileReaderComponent,
  ]
})
export class FileReaderDemoComponent {
  form = new FormGroup({
    caCert: new FormControl('', [certificateValidator(), Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  certAcceptedFiles = '.pem, .cer, .key';
  certFileLimit = 5; // MB

  onFileChange(content: string) {
    console.log(content);
  }

  submit() {
    console.log(this.form.value);
  }
}
  `);
}
