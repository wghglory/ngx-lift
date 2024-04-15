import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {CalloutComponent, PageContainerComponent} from 'clr-lift';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-clr-lift-home',
  standalone: true,
  imports: [CommonModule, ClarityModule, CalloutComponent, PageContainerComponent, CodeBlockComponent],
  templateUrl: './clr-lift-home.component.html',
  styleUrl: './clr-lift-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrExtensionHomeComponent {}
