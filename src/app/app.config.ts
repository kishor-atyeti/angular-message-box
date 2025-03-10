import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { NgxsModule, provideStore } from '@ngxs/store';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot()),
    provideStore(),
    provideAnimations(),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ]
};

provideStore([])
