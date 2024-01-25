import {NavConfig} from './nav-config.model';

export const ngxExtensionNavConfig: NavConfig[] = [
  {
    path: '/ngx-extension/operators',
    value: 'Operators',
    icon: 'pipe',
    children: [
      {path: '/createAsyncState', value: 'createAsyncState'},
      {path: '/switchMapWithAsyncState', value: 'switchMapWithAsyncState'},
      {path: '/combineLatestEager', value: 'combineLatestEager'},
      {path: '/distinctOnChange', value: 'distinctOnChange'},
      {path: '/logger', value: 'logger'},
    ],
  },
];

export const clrExtensionNavConfig: NavConfig[] = [
  {
    path: '/clr-extension/operators',
    value: 'Operators',
    icon: 'pipe',
    children: [{path: '/dgState', value: 'dgState'}],
  },
  {
    path: '/clr-extension/components',
    value: 'Components',
    icon: 'components',
    children: [
      {path: '/alert', value: 'Alert'},
      {path: '/multi-alerts', value: 'Multi Alerts'},
      {path: '/spinner', value: 'Spinner'},
    ],
  },
  {
    path: '/clr-extension/utilities',
    value: 'Utilities',
    icon: 'utilities',
    children: [{path: '/datagrid', value: 'Datagrid'}],
  },
];
