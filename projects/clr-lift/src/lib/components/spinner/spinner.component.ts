import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, HostBinding, input} from '@angular/core';
import {ClarityModule} from '@clr/angular';

@Component({
  selector: 'cll-spinner',
  standalone: true,
  imports: [CommonModule, ClarityModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  size = input<'lg' | 'md' | 'sm'>('lg');
  isCenter = input(true);

  @HostBinding('class') customClass = '';
}
