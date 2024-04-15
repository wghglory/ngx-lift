import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxExtensionHomeComponent} from './ngx-lift-home.component';

describe('NgxExtensionHomeComponent', () => {
  let component: NgxExtensionHomeComponent;
  let fixture: ComponentFixture<NgxExtensionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxExtensionHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxExtensionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
