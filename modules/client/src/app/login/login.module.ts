import {NgModule} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateService, TranslateModule} from "ng2-translate";
import {LoginComponent} from "./login.component";

const ADMIN_DECLARATION = [
    LoginComponent
];

@NgModule({
    imports: [
        TranslateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ADMIN_DECLARATION
    ],
    exports: [
        ADMIN_DECLARATION
    ],
    providers: [
        TranslateService,
        FormBuilder
    ]
})

export class LoginComponentModule {

}