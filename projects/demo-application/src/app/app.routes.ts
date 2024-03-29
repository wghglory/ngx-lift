import {Routes} from '@angular/router';

import {AlertDemoComponent} from './clr-lib/pages/alert-demo/alert-demo.component';
import {ClrDatagridUtilComponent} from './clr-lib/pages/clr-datagrid-util/clr-datagrid-util.component';
import {ClrExtensionHomeComponent} from './clr-lib/pages/clr-extension-home/clr-extension-home.component';
import {DgStateComponent} from './clr-lib/pages/dg-state/dg-state.component';
import {KeyValueInputsDemoComponent} from './clr-lib/pages/key-value-inputs-demo/key-value-inputs-demo.component';
import {MultiAlertsDemoComponent} from './clr-lib/pages/multi-alerts-demo/multi-alerts-demo.component';
import {SpinnerDemoComponent} from './clr-lib/pages/spinner-demo/spinner-demo.component';
import {TimelineWizardDemoComponent} from './clr-lib/pages/timeline-wizard-demo/timeline-wizard-demo.component';
import {ToastDemoComponent} from './clr-lib/pages/toast-demo/toast-demo.component';
import {TooltipDemoComponent} from './clr-lib/pages/tooltip-demo/tooltip-demo.component';
import {NgxExtensionHomeComponent} from './ngx-lib/pages/ngx-extension-home/ngx-extension-home.component';
import {CombineLatestEagerComponent} from './ngx-lib/pages/operators/combine-latest-eager/combine-latest-eager.component';
import {CreateAsyncStateComponent} from './ngx-lib/pages/operators/create-async-state/create-async-state.component';
import {DistinctOnChangeComponent} from './ngx-lib/pages/operators/distinct-on-change/distinct-on-change.component';
import {LoggerComponent} from './ngx-lib/pages/operators/logger/logger.component';
import {PollComponent} from './ngx-lib/pages/operators/poll/poll.component';
import {SwitchMapWithAsyncStateComponent} from './ngx-lib/pages/operators/switch-map-with-async-state/switch-map-with-async-state.component';
import {ArrayJoinPipeComponent} from './ngx-lib/pages/pipes/array-join-pipe/array-join-pipe.component';
import {ByteConverterPipeComponent} from './ngx-lib/pages/pipes/byte-converter-pipe/byte-converter-pipe.component';
import {IsHttpsPipeComponent} from './ngx-lib/pages/pipes/is-https-pipe/is-https-pipe.component';
import {MaskPipeComponent} from './ngx-lib/pages/pipes/mask-pipe/mask-pipe.component';
import {IfValidatorComponent} from './ngx-lib/pages/validators/if-validator/if-validator.component';
import {UniqueValidatorComponent} from './ngx-lib/pages/validators/unique-validator/unique-validator.component';
import {UrlValidatorComponent} from './ngx-lib/pages/validators/url-validator/url-validator.component';

export const routes: Routes = [
  {
    path: 'ngx-extension',
    children: [
      {
        path: '',
        component: NgxExtensionHomeComponent,
      },
      {
        path: 'operators',
        children: [
          {
            path: 'createAsyncState',
            component: CreateAsyncStateComponent,
          },
          {
            path: 'switchMapWithAsyncState',
            component: SwitchMapWithAsyncStateComponent,
          },
          {
            path: 'combineLatestEager',
            component: CombineLatestEagerComponent,
          },
          {
            path: 'distinctOnChange',
            component: DistinctOnChangeComponent,
          },
          {
            path: 'logger',
            component: LoggerComponent,
          },
          {
            path: 'poll',
            component: PollComponent,
          },
        ],
      },
      {
        path: 'pipes',
        children: [
          {
            path: 'array-join',
            component: ArrayJoinPipeComponent,
          },
          {
            path: 'byte-converter',
            component: ByteConverterPipeComponent,
          },
          {
            path: 'is-https',
            component: IsHttpsPipeComponent,
          },
          {
            path: 'mask',
            component: MaskPipeComponent,
          },
        ],
      },
      {
        path: 'validators',
        children: [
          {
            path: 'if-validator',
            component: IfValidatorComponent,
          },
          {
            path: 'unique',
            component: UniqueValidatorComponent,
          },
          {
            path: 'url',
            component: UrlValidatorComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'clr-extension',
    children: [
      {
        path: '',
        component: ClrExtensionHomeComponent,
      },
      {
        path: 'operators',
        children: [
          {
            path: 'dgState',
            component: DgStateComponent,
          },
        ],
      },
      {
        path: 'components',
        children: [
          {
            path: 'spinner',
            component: SpinnerDemoComponent,
          },
          {
            path: 'alert',
            component: AlertDemoComponent,
          },
          {
            path: 'multi-alerts',
            component: MultiAlertsDemoComponent,
          },
          {
            path: 'key-value-inputs',
            component: KeyValueInputsDemoComponent,
          },
          {
            path: 'timeline-wizard',
            component: TimelineWizardDemoComponent,
          },
          {
            path: 'toast',
            component: ToastDemoComponent,
          },
          {
            path: 'tooltip',
            component: TooltipDemoComponent,
          },
        ],
      },
      {
        path: 'utilities',
        children: [
          {
            path: 'datagrid',
            component: ClrDatagridUtilComponent,
          },
        ],
      },
    ],
  },
  {path: '', redirectTo: '/ngx-extension', pathMatch: 'full'},
  {
    path: '**',
    component: NgxExtensionHomeComponent,
  },
];
