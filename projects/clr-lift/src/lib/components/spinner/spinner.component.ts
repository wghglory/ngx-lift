import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
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
  @Input() size: 'lg' | 'md' | 'sm' = 'lg';
  @Input() isCenter = true;
  @HostBinding('class') customClass = '';
}
