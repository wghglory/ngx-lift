import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NoInfoPipeComponent} from './no-info-pipe.component';

describe('NoInfoPipeComponent', () => {
  let component: NoInfoPipeComponent;
  let fixture: ComponentFixture<NoInfoPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoInfoPipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoInfoPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
