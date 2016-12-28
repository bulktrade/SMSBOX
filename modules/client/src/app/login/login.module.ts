import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateService, TranslateModule } from "ng2-translate";
import { LoginComponent } from "./login.component";
import { MessagesModule } from "primeng/components/messages/messages";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        MessagesModule,
        CommonModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [
        TranslateService,
        FormBuilder
    ]
})
export class LoginModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LoginModule
        };
    }
}
