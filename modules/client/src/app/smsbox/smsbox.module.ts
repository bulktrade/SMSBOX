import { NgModule } from "@angular/core";
import { SmsBoxComponent } from "./smsbox.component";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "ng2-translate";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/components/button/button";

const DECLARATIONS = [
    SmsBoxComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        TranslateModule,
        ButtonModule
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