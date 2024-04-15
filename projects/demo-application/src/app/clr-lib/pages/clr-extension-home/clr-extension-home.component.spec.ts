import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClrExtensionHomeComponent} from './clr-lift-home.component';

describe('ClrExtensionHomeComponent', () => {
  let component: ClrExtensionHomeComponent;
  let fixture: ComponentFixture<ClrExtensionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrExtensionHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrExtensionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
