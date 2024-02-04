import {Routes} from '@angular/router';

import {AlertDemoComponent} from './clr-lib/pages/alert-demo/alert-demo.component';
import {ClrDatagridUtilComponent} from './clr-lib/pages/clr-datagrid-util/clr-datagrid-util.component';
import {ClrExtensionHomeComponent} from './clr-lib/pages/clr-extension-home/clr-extension-home.component';
import {DgStateComponent} from './clr-lib/pages/dg-state/dg-state.component';
import {KeyValueInputsDemoComponent} from './clr-lib/pages/key-value-inputs-demo/key-value-inputs-demo.component';
import {MultiAlertsDemoComponent} from './clr-lib/pages/multi-alerts-demo/multi-alerts-demo.component';
import {NoInfoPipeComponent} from './clr-lib/pages/no-info-pipe/no-info-pipe.component';
import {SpinnerDemoComponent} from './clr-lib/pages/spinner-demo/spinner-demo.component';
import {TimelineWizardDemoComponent} from './clr-lib/pages/timeline-wizard-demo/timeline-wizard-demo.component';
import {ToastDemoComponent} from './clr-lib/pages/toast-demo/toast-demo.component';
import {ArrayJoinPipeComponent} from './ngx-lib/pages/array-join-pipe/array-join-pipe.component';
import {ByteConverterPipeComponent} from './ngx-lib/pages/byte-converter-pipe/byte-converter-pipe.component';
import {CombineLatestEagerComponent} from './ngx-lib/pages/combine-latest-eager/combine-latest-eager.component';
import {CreateAsyncStateComponent} from './ngx-lib/pages/create-async-state/create-async-state.component';
import {DistinctOnChangeComponent} from './ngx-lib/pages/distinct-on-change/distinct-on-change.component';
import {LoggerComponent} from './ngx-lib/pages/logger/logger.component';
import {NgxExtensionHomeComponent} from './ngx-lib/pages/ngx-extension-home/ngx-extension-home.component';
import {SwitchMapWithAsyncStateComponent} from './ngx-lib/pages/switch-map-with-async-state/switch-map-with-async-state.component';
import {UniqueValidatorComponent} from './ngx-lib/pages/unique-validator/unique-validator.component';

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
        ],
      },
      {
        path: 'validators',
        children: [
          {
            path: 'unique',
            component: UniqueValidatorComponent,
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
      {
        path: 'pipes',
        children: [
          {
            path: 'no-info',
            component: NoInfoPipeComponent,
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
