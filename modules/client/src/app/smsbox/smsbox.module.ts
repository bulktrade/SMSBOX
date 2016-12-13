import { NgModule } from "@angular/core";
import { SmsBoxComponent } from "./smsbox.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";

const DECLARATIONS = [
    SmsBoxComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        TranslateModule
        // ButtonModule
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