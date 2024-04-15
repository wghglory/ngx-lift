import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {PageContainerComponent} from 'clr-lift';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-ngx-lift-home',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent, CodeBlockComponent],
  templateUrl: './ngx-lift-home.component.html',
  styleUrl: './ngx-lift-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtensionHomeComponent {}
