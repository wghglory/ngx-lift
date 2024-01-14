import {Routes} from '@angular/router';

import {FilterUsersComponent} from './filter-users/filter-users.component';
import {HomeComponent} from './home/home.component';
import {UserCardListComponent} from './user-card-list/user-card-list.component';
import {UserDatagridComponent} from './user-datagrid/user-datagrid.component';

export const routes: Routes = [
  {
    path: 'createAsyncState',
    component: UserCardListComponent,
  },
  {
    path: 'datagrid',
    component: UserDatagridComponent,
  },
  {
    path: 'switchMapWithAsyncState',
    component: FilterUsersComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
