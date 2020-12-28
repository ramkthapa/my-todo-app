import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {APP_ROUTES} from './app-routing';


@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      enableTracing: false,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
