import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ClarityIcons, moonIcon, sunIcon} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';

import {TranslationService} from '../../services/translation.service';
import {MockTranslationService} from '../../services/translation.service.mock';
import {ThemeToggleComponent} from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, ThemeToggleComponent],
      providers: [{provide: TranslationService, useClass: MockTranslationService}],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    ClarityIcons.addIcons(moonIcon, sunIcon);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme on button click', () => {
    const initialTheme = component.theme;
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    const updatedTheme = component.theme;
    expect(updatedTheme).not.toEqual(initialTheme);
  });

  it('should emit new theme on theme toggle', () => {
    spyOn(component.changeTheme, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.changeTheme.emit).toHaveBeenCalledOnceWith(jasmine.any(String));
  });

  it('should set theme on initialization if stored in local storage', () => {
    const storedTheme = 'dark';
    localStorage.setItem('cds-theme', storedTheme);
    component.ngOnInit();
    expect(component.theme).toEqual(storedTheme);
  });

  // Cleanup
  afterEach(() => {
    localStorage.clear();
  });
});
