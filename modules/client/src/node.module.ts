import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

// Will be merged into @angular/platform-browser in a later release
// see https://github.com/angular/angular/pull/12322
import { AppComponent } from "./app/app.component";
import { AppModule } from "./app/app.module";

export function getLRU() {
  return new Map();
}
export function getRequest() {
  return Zone.current.get('req') || {};
}
export function getResponse() {
  return Zone.current.get('res') || {};
}

// TODO(gdi2290): refactor into Universal
export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    // MaterialModule.forRoot() should be included first
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included

    FormsModule,
    AppModule,
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },

    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },

    { provide: 'LRU', useFactory: getLRU, deps: [] },

  ]
})
export class MainModule {
}
