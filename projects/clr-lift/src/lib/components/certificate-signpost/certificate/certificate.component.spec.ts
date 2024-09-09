import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CertificateComponent} from './certificate.component';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CertificateComponent],
    });
    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('certificate', {
      notBefore: new Date(),
      notAfter: new Date(),
      issuer: '',
      subject: '',
    });
    fixture.componentRef.setInput('certificateStatus', {
      labelText: 'string',
      labelClass: 'string',
      status: 'info',
      shape: 'error-standard',
    });
    fixture.componentRef.setInput('hash', {sha256: '', sha1: ''});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
