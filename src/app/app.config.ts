import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgxsModule, provideStore } from '@ngxs/store';
import { provideToastr } from 'ngx-toastr';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { MessageState } from './store/MessageState';
import { UserState } from './store/UserState';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    importProvidersFrom(NgxsModule.forRoot([MessageState, UserState]), HttpClientModule),
    provideHttpClient(withInterceptors([httpInterceptor]))
  ]
};

provideStore([])
