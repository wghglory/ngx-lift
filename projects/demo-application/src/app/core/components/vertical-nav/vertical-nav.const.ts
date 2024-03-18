import {NavConfig} from './nav-config.model';

export const ngxExtensionNavConfig: NavConfig[] = [
  {
    path: '/ngx-extension/operators',
    value: 'Operators',
    icon: 'objects',
    children: [
      {path: '/createAsyncState', value: 'createAsyncState'},
      {path: '/switchMapWithAsyncState', value: 'switchMapWithAsyncState'},
      {path: '/combineLatestEager', value: 'combineLatestEager'},
      {path: '/distinctOnChange', value: 'distinctOnChange'},
      {path: '/logger', value: 'logger'},
      {path: '/poll', value: 'poll'},
    ],
  },
  {
    path: '/ngx-extension/pipes',
    value: 'Pipes',
    icon: 'pipes',
    children: [
      {path: '/array-join', value: 'Array Join'},
      {path: '/byte-converter', value: 'Byte Converter'},
      {path: '/is-https', value: 'Is Https'},
      {path: '/mask', value: 'Mask'},
    ],
  },
  {
    path: '/ngx-extension/validators',
    value: 'Validators',
    icon: 'certificate',
    children: [
      {path: '/if-validator', value: 'ifValidator / ifAsyncValidator'},
      {path: '/unique', value: 'UniqueValidator'},
      {path: '/url', value: 'UrlValidator'},
    ],
  },
];

export const clrExtensionNavConfig: NavConfig[] = [
  {
    path: '/clr-extension/operators',
    value: 'Operators',
    icon: 'objects',
    children: [{path: '/dgState', value: 'dgState'}],
  },
  {
    path: '/clr-extension/components',
    value: 'Components',
    icon: 'heat-map',
    children: [
      {path: '/alert', value: 'Alert'},
      {path: '/multi-alerts', value: 'Multi Alerts'},
      {path: '/key-value-inputs', value: 'Key Value Inputs'},
      {path: '/spinner', value: 'Spinner'},
      {path: '/timeline-wizard', value: 'Timeline Wizard'},
      {path: '/toast', value: 'Toast'},
    ],
  },
  {
    path: '/clr-extension/utilities',
    value: 'Utilities',
    icon: 'wrench',
    children: [{path: '/datagrid', value: 'Datagrid'}],
  },
];
