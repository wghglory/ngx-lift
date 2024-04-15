import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'cll-page-container',
  standalone: true,
  imports: [],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainerComponent {
  @Input({required: true}) title = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({alias: 'class'}) customClass = '';
}
