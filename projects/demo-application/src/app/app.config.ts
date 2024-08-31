import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideAngularSvgIcon} from 'angular-svg-icon';
import player from 'lottie-web';
import {provideLottieOptions} from 'ngx-lottie';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: LOCALE_ID,
      useFactory: () => navigator.language || 'en',
    },
    provideLottieOptions({
      player: () => player,
    }),
    provideAngularSvgIcon(),
  ],
};
