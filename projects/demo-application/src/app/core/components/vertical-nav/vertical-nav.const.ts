import {NavConfig} from './nav-config.model';

export const ngxExtensionNavConfig: NavConfig[] = [
  {
    path: '/ngx-extension/operators',
    value: 'Operators',
    icon: 'pipes',
    children: [
      {path: '/createAsyncState', value: 'createAsyncState'},
      {path: '/switchMapWithAsyncState', value: 'switchMapWithAsyncState'},
      {path: '/combineLatestEager', value: 'combineLatestEager'},
      {path: '/distinctOnChange', value: 'distinctOnChange'},
      {path: '/logger', value: 'logger'},
    ],
  },
  {
    path: '/ngx-extension/validators',
    value: 'Validators',
    icon: 'validators',
    children: [{path: '/unique', value: 'UniqueValidator'}],
  },
];

export const clrExtensionNavConfig: NavConfig[] = [
  {
    path: '/clr-extension/operators',
    value: 'Operators',
    icon: 'pipes',
    children: [{path: '/dgState', value: 'dgState'}],
  },
  {
    path: '/clr-extension/components',
    value: 'Components',
    icon: 'components',
    children: [
      {path: '/alert', value: 'Alert'},
      {path: '/multi-alerts', value: 'Multi Alerts'},
      {path: '/key-value-inputs', value: 'Key Value Inputs'},
      {path: '/spinner', value: 'Spinner'},
      {path: '/toast', value: 'Toast'},
    ],
  },
  {
    path: '/clr-extension/utilities',
    value: 'Utilities',
    icon: 'utilities',
    children: [{path: '/datagrid', value: 'Datagrid'}],
  },
];
