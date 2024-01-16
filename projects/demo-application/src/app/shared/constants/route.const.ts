import {RouteData} from '../models/route-data.model';

export const ngxExtensionData: RouteData[] = [
  {
    path: '/ngx-extension/operators',
    value: 'Operators',
    icon: 'pipe',
    children: [
      {path: '/createAsyncState', value: 'createAsyncState'},
      {path: '/switchMapWithAsyncState', value: 'switchMapWithAsyncState'},
    ],
  },
];

export const clrExtensionData: RouteData[] = [
  {
    path: '/clr-extension/operators',
    value: 'Operators',
    icon: 'pipe',
    children: [{path: '/dgState', value: 'dgState'}],
  },
];
