import {Routes} from '@angular/router';

import {ClrExtensionHomeComponent} from './clr-extension-home/clr-extension-home.component';
import {CreateAsyncStateComponent} from './create-async-state/create-async-state.component';
import {FilterUsersComponent} from './filter-users/filter-users.component';
import {NgxExtensionHomeComponent} from './ngx-extension-home/ngx-extension-home.component';
import {UserDatagridComponent} from './user-datagrid/user-datagrid.component';

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
            component: FilterUsersComponent,
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
            component: UserDatagridComponent,
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
