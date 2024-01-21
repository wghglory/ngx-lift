import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsDemoComponent } from './alerts-demo.component';

describe('AlertsDemoComponent', () => {
  let component: AlertsDemoComponent;
  let fixture: ComponentFixture<AlertsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
