import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileReaderComponent} from './file-reader.component';

describe('FileReaderComponent', () => {
  let component: FileReaderComponent;
  let fixture: ComponentFixture<FileReaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FileReaderComponent],
    });
    fixture = TestBed.createComponent(FileReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
