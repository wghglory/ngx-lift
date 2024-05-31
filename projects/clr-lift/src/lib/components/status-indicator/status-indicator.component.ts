import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {
  ClarityIcons,
  disconnectIcon,
  errorStandardIcon,
  successStandardIcon,
  syncIcon,
  unknownStatusIcon,
  warningStandardIcon,
} from '@cds/core/icon';
import {ClarityModule} from '@clr/angular';

import {TranslatePipe} from '../../pipes/translate.pipe';

ClarityIcons.addIcons(
  successStandardIcon,
  disconnectIcon,
  errorStandardIcon,
  warningStandardIcon,
  syncIcon,
  unknownStatusIcon,
);

@Component({
  selector: 'cll-status-indicator',
  standalone: true,
  imports: [CommonModule, ClarityModule, TranslatePipe],
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusIndicatorComponent {
  iconStatus = input<'success' | 'error' | 'pending' | 'warning' | 'inactive' | 'unknown'>();
  iconSize = input<'lg' | 'md' | 'sm' | number>('sm');
}
