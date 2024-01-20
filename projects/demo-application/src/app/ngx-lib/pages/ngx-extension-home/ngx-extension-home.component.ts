import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {PageContainerComponent} from 'clr-extension';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-ngx-extension-home',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent, CodeBlockComponent],
  templateUrl: './ngx-extension-home.component.html',
  styleUrl: './ngx-extension-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtensionHomeComponent {}
