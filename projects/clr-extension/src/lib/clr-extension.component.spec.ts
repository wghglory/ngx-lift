import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClrExtensionComponent} from './clr-extension.component';

describe('ClrExtensionComponent', () => {
  let component: ClrExtensionComponent;
  let fixture: ComponentFixture<ClrExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrExtensionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
