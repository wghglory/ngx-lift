import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {CalloutComponent, PageContainerComponent} from 'clr-extension';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-clr-extension-home',
  standalone: true,
  imports: [CommonModule, ClarityModule, CalloutComponent, PageContainerComponent, CodeBlockComponent],
  templateUrl: './clr-extension-home.component.html',
  styleUrl: './clr-extension-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrExtensionHomeComponent {}
