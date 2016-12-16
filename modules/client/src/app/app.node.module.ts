import { NgModule, ApplicationRef } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { AdminComponentModule } from "./admin/admin.module";
import { ThereComponentModule } from "./there/there.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SmsBoxComponentModule } from "./smsbox/smsbox.module";
import { SignupComponent } from "./signup/signup.component";
import { SignupService } from "./signup/signup-service";
import { LoginComponent } from "./login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { UserModule } from "./user/user.module";
import { CubeGridComponent } from "./common/spinner/cube-grid/cube-grid.component";
import { EqualValidatorModule } from "./common/equal-validator.directive";
import { CrudModule } from "./crud/crud.module";
import { CrudViewResolve } from "./crud/crud-view/crud-view.resolve";
import { CrudCreateResolve } from "./crud/crud-create/crud-create.resolve";
import { CrudUpdateResolve } from "./crud/crud-update/crud-update.resolve";
import { CrudService } from "./crud/crud.service";
import { GrowlService } from "./services/growl/growl.service";
import { FeathersService } from "./services/feathers.service";
import { MessagesModule } from "primeng/components/messages/messages";
import { TokenService } from "./services/auth/token.service";
import { LoginGuard } from "./login/login.guard";
import { GrowlModule } from "primeng/components/growl/growl";
import { CrudMainResolve } from "./crud/crud.resolve";
import { CommonService } from "./services/common.service";
import { UserSettingsResolve } from "./user/settings/user-settings.resolve";
import { InternalStateType, AppState } from "./app.service";
import { createNewHosts, createInputTransfer, removeNgStyles } from "@angularclass/hmr";
import { UniversalModule, isNode, isBrowser } from "angular2-universal";

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

@NgModule({
    imports: [
        CommonModule,
        UniversalModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => {
                return new TranslateStaticLoader(http, '../assets/i18n', '.json')
            },
            deps: [Http]
        }),
        //BreadcrumbModule.forRoot(),
        MessagesModule,
        CrudModule,
        EqualValidatorModule,
        AdminComponentModule,
        UserModule,
        ThereComponentModule,
        SmsBoxComponentModule,
        GrowlModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        SignupComponent,
        LoginComponent,
        CubeGridComponent
    ],
    providers: [
        AppState,
        CrudService,
        CrudViewResolve,
        CrudCreateResolve,
        CrudUpdateResolve,
        CrudMainResolve,
        UserSettingsResolve,
        FormBuilder,
        SignupService,
        TokenService,
        GrowlService,
        CommonService,
        LoginGuard,
        {
            provide: FeathersService,
            useFactory: (http: Http, tokenService: TokenService) => {
                return new FeathersService(http, tokenService, 'http://localhost:3030');
            },
            deps: [Http, TokenService]
        },
        { provide: 'isBrowser', useValue: isBrowser },
        { provide: 'isNode', useValue: isNode }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}

    hmrOnInit(store: StoreType) {
        if (!store || !store.state) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
