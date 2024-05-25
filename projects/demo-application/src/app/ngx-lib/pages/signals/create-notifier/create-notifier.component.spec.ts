import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateNotifierComponent} from './create-notifier.component';

describe('CreateNotifierComponent', () => {
  let component: CreateNotifierComponent;
  let fixture: ComponentFixture<CreateNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNotifierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
