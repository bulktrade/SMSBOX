import { NgModule, ApplicationRef } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { AppState } from "./app.service";
import { UniversalModule, isNode, isBrowser } from "angular2-universal";
import { AppModule } from "./app.module";

export function _isBrowser() {
    return isBrowser;
}

export function _isNode() {
    return isNode;
}

@NgModule({
    imports: [
        CommonModule,
        UniversalModule,
        AppModule
    ],
    providers: [
        { provide: 'isBrowser', useFactory: _isBrowser },
        { provide: 'isNode', useValue: _isNode }
    ],
    bootstrap: [AppComponent]
})

export class MainModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {
    }
}
