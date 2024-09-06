import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes'
import { cookiesInterceptor } from './interceptors'
import { AuthEffects, authFeatureKey, authReducer } from './store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cookiesInterceptor])),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideEffects(AuthEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
