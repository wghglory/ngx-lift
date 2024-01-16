import {CommonModule} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ClarityModule} from '@clr/angular';

@Component({
  selector: 'clx-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  standalone: true,
  imports: [ClarityModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() alertType = 'danger';
  @Input() isSmall = false;
  @Input() error: HttpErrorResponse | undefined;
  @Input() content = '';
}
