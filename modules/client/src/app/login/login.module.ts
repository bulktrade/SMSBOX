import {NgModule} from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateService, TranslateModule} from "ng2-translate";
import {LoginComponent} from "./login.component";
import { MessagesModule } from "primeng/components/messages/messages";
import { CommonModule } from "@angular/common";

const ADMIN_DECLARATION = [
    LoginComponent
];

@NgModule({
    imports: [
        MessagesModule,
        CommonModule,
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