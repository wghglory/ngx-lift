import {Component, Input} from '@angular/core';

@Component({
  selector: 'clx-page-container',
  standalone: true,
  imports: [],
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.scss',
})
export class PageContainerComponent {
  @Input({required: true}) title = '';
}
