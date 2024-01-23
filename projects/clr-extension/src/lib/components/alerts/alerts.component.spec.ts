/* eslint-disable @typescript-eslint/no-unused-vars */
import {CommonModule} from '@angular/common';
import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ClarityModule} from '@clr/angular';
import {of} from 'rxjs';

import {Alert} from '../../models';
import {TranslationService} from '../../services/translation.service';
import {MockTranslationService} from '../../services/translation.service.mock';
import {AlertsComponent} from './alerts.component';
import {AlertsService} from './alerts.service';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertsService: AlertsService;
  let translationService: MockTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ClarityModule, AlertsComponent],
      providers: [
        {
          provide: AlertsService,
          useValue: {alerts$: of([new Alert('alert 1'), new Alert('alert 2')]), deleteAlert: (id: symbol) => {}},
        },
        {provide: TranslationService, useClass: MockTranslationService},
      ],
    });

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    alertsService = TestBed.inject(AlertsService);
    translationService = TestBed.inject(TranslationService) as MockTranslationService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close alert when onCloseAlert is called', () => {
    const alertId = Symbol('testId');
    const deleteAlertSpy = spyOn(alertsService, 'deleteAlert');

    component.onCloseAlert(alertId);

    expect(deleteAlertSpy).toHaveBeenCalledWith(alertId);
  });

  it('should set closeButtonAriaLabel based on translation', () => {
    spyOn(translationService, 'translate').and.returnValue('TranslatedCloseText');

    const closeButtonAriaLabel = component.closeButtonAriaLabel;

    expect(translationService.translate).toHaveBeenCalledWith(jasmine.any(Object), 'close');
    expect(closeButtonAriaLabel).toBe('TranslatedCloseText');
  });
});

@Component({
  template: ` <clx-alerts></clx-alerts> `,
  standalone: true,
  imports: [AlertsComponent],
})
class TestAlertsHostComponent {}

describe('TestAlertsHostComponent', () => {
  let fixture: ComponentFixture<TestAlertsHostComponent>;
  let alertsService: AlertsService;
  let element: DebugElement;

  const mockAlerts = [
    new Alert('Test Alert 1', {alertType: 'info', isAppLevel: true}),
    new Alert('Test Alert 2', {alertType: 'warning', isAppLevel: false}),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ClarityModule, AlertsComponent, TestAlertsHostComponent],
      providers: [
        {
          provide: AlertsService,
          useValue: {alerts$: of(mockAlerts), deleteAlert: (id: symbol) => {}},
        },
        {provide: TranslationService, useClass: MockTranslationService},
      ],
    });

    fixture = TestBed.createComponent(TestAlertsHostComponent);
    alertsService = TestBed.inject(AlertsService);

    element = fixture.debugElement.query(By.directive(AlertsComponent));
  });

  it('should display alerts', () => {
    fixture.detectChanges();

    const alertElements = element.queryAll(By.css('.alert'));
    expect(alertElements.length).toBe(2);

    mockAlerts.forEach((alert, index) => {
      const alertElement = alertElements[index];
      expect(alertElement.nativeElement.textContent).toContain(alert.content);
    });
  });

  it('should call onCloseAlert when alert is closed', () => {
    const mockAlert = new Alert('Test Alert', {alertType: 'info', isAppLevel: true});
    alertsService.alerts$ = of([mockAlert]);
    const deleteAlertSpy = spyOn(alertsService, 'deleteAlert');

    fixture.detectChanges();

    const closeButton = element.query(By.css('button.close'));
    closeButton.nativeElement.click();

    expect(deleteAlertSpy).toHaveBeenCalled();
  });
});
