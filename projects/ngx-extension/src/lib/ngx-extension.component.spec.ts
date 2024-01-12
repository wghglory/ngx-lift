import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxExtensionComponent} from './ngx-extension.component';

describe('NgxExtensionComponent', () => {
  let component: NgxExtensionComponent;
  let fixture: ComponentFixture<NgxExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxExtensionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
