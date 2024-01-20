import {Routes} from '@angular/router';

// clr-extension
import {ClrExtensionHomeComponent} from './clr-lib/pages/clr-extension-home/clr-extension-home.component';
import {DgStateComponent} from './clr-lib/pages/dg-state/dg-state.component';
import {CombineLatestEagerComponent} from './ngx-lib/pages/combine-latest-eager/combine-latest-eager.component';
// ngx-extension
import {CreateAsyncStateComponent} from './ngx-lib/pages/create-async-state/create-async-state.component';
import {DistinctOnChangeComponent} from './ngx-lib/pages/distinct-on-change/distinct-on-change.component';
import {LoggerComponent} from './ngx-lib/pages/logger/logger.component';
import {NgxExtensionHomeComponent} from './ngx-lib/pages/ngx-extension-home/ngx-extension-home.component';
import {SwitchMapWithAsyncStateComponent} from './ngx-lib/pages/switch-map-with-async-state/switch-map-with-async-state.component';

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
    ],
  },
  {path: '', redirectTo: '/ngx-extension', pathMatch: 'full'},
  {
    path: '**',
    component: NgxExtensionHomeComponent,
  },
];
