import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'clx-callout',
  standalone: true,
  imports: [],
  templateUrl: './callout.component.html',
  styleUrl: './callout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {}
