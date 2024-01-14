import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {ClarityModule} from '@clr/angular';

@Component({
  selector: 'clx-spinner',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() spinnerSize: 'lg' | 'md' | 'sm' = 'lg';
  @Input() spinnerCenter = true;
  @HostBinding('class') customClass = '';
}
