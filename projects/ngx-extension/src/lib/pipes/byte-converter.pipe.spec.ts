import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ByteConverterPipe} from './byte-converter.pipe';

@Component({
  template: `<div>{{ fileSize | byteConverter }}</div>`,
})
class TestComponent {
  fileSize: number | undefined | null = 0;
}

describe('ByteConverterPipe', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ByteConverterPipe, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should transform bytes to KB', () => {
    component.fileSize = 1024;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('1.00 KB');
  });

  it('should transform bytes to MB', () => {
    component.fileSize = 2 * 1024 * 1024;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('2.00 MB');
  });

  it('should transform bytes to GB', () => {
    component.fileSize = 2 * 1024 * 1024 * 1024;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('2.00 GB');
  });

  it('should transform bytes to TB', () => {
    component.fileSize = 2 * 1024 * 1024 * 1024 * 1024;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('2.00 TB');
  });

  it('should handle null input', () => {
    component.fileSize = null;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('-');
  });

  it('should handle undefined input', () => {
    component.fileSize = undefined;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('-');
  });

  it('should handle NaN input', () => {
    component.fileSize = NaN;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('div');
    expect(element.textContent).toBe('-');
  });
});
