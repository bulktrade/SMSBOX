import { NgModule } from "@angular/core";
import { SmsBoxComponent } from "./smsbox.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "ng2-translate";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { LanguageSelectorModule } from "../language-selector/language-selector.component";

const DECLARATIONS = [
    SmsBoxComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        TranslateModule,
        DropdownModule,
        LanguageSelectorModule
    ],
    declarations: [
        ...DECLARATIONS
    ],
    exports: [
        ...DECLARATIONS
    ]
})

export class SmsBoxComponentModule {

}