import {ChangeDetectionStrategy, Component, effect} from '@angular/core';
import {ClarityModule} from '@clr/angular';
import {CalloutComponent, PageContainerComponent} from 'clr-lift';
import {injectParams} from 'ngx-lift';

import {CodeBlockComponent} from '../../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../../shared/utils/highlight.util';

@Component({
  selector: 'app-inject-params',
  standalone: true,
  imports: [ClarityModule, PageContainerComponent, CodeBlockComponent, CalloutComponent],
  templateUrl: './inject-params.component.html',
  styleUrl: './inject-params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InjectParamsComponent {
  params = injectParams();

  userId = injectParams('id'); // returns a signal with the value of the id param

  paramsKeys = injectParams((params) => Object.keys(params)); // returns a signal with the keys of the params

  constructor() {
    effect(() => {
      console.log(this.params(), 'params');
      console.log(this.userId(), 'userId');
      console.log(this.paramsKeys(), 'paramsKeys');
    });
  }

  code = highlight(`
import {injectParams} from 'ngx-lift';

export class InjectParamsComponent {
  // returns a signal with the current route params
  params = injectParams();

  // returns a signal with the value of the id param
  userId = injectParams('id');

  // returns a signal with the keys of the params
  paramsKeys = injectParams((params) => Object.keys(params));
}
    `);
}
