import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from "ng2-translate";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { SmsBoxComponentModule } from "./smsbox/smsbox.module";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { UserModule } from "./user/user.module";
import { AdminComponentModule } from "./admin/admin.module";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
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
        // MessagesModule,
        // CrudModule,
        // EqualValidatorModule,
        // AdminComponentModule,
        // UserModule,
        // ThereComponentModule,
        SmsBoxComponentModule,
        // GrowlModule
    ],
    declarations: [
        AppComponent,
        // NotFoundComponent,
        // SignupComponent,
        // LoginComponent,
        // CubeGridComponent
    ],
    providers: [
        // CrudService,
        // CrudViewResolve,
        // CrudCreateResolve,
        // CrudUpdateResolve,
        // CrudMainResolve,
        // UserSettingsResolve,
        // FormBuilder,
        // SignupService,
        // TokenService,
        // GrowlService,
        // CommonService,
        // LoginGuard,
        // {
        //     provide: FeathersService,
        //     useFactory: (http: Http, tokenService: TokenService) => {
        //         return new FeathersService(http, tokenService, 'http://localhost:3030');
        //     },
        //     deps: [Http, TokenService]
        // }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
