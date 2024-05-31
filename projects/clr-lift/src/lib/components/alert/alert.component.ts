import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ClarityModule} from '@clr/angular';

import {AlertType} from '../alerts/alert.type';

@Component({
  selector: 'cll-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  standalone: true,
  imports: [ClarityModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  alertType = input<AlertType>('danger');
  isSmall = input(false);
  isAppLevel = input(false);
  error = input<HttpErrorResponse>();
  content = input('');
}
