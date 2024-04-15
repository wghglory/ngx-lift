import {NavConfig} from './nav-config.model';

export const ngxExtensionNavConfig: NavConfig[] = [
  {
    path: '/ngx-lift/operators',
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
    path: '/ngx-lift/pipes',
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
    path: '/ngx-lift/validators',
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
    path: '/clr-lift/operators',
    value: 'Operators',
    icon: 'objects',
    children: [{path: '/dgState', value: 'dgState'}],
  },
  {
    path: '/clr-lift/components',
    value: 'Components',
    icon: 'heat-map',
    children: [
      {path: '/alert', value: 'Alert'},
      {path: '/multi-alerts', value: 'Multi Alerts'},
      {path: '/key-value-inputs', value: 'Key Value Inputs'},
      {path: '/spinner', value: 'Spinner'},
      {path: '/timeline-wizard', value: 'Timeline Wizard'},
      {path: '/toast', value: 'Toast'},
      {path: '/tooltip', value: 'Tooltip'},
    ],
  },
  {
    path: '/clr-lift/utilities',
    value: 'Utilities',
    icon: 'wrench',
    children: [{path: '/datagrid', value: 'Datagrid'}],
  },
];
