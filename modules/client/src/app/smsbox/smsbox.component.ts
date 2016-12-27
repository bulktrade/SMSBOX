import { Component } from "@angular/core";
import { SMSBoxModel } from "./smsbox.model";
import { SelectItem } from "primeng/components/common/api";
import { LanguageModel } from "../common/component/language-selector/language-selector.model";
import { SUPPORT_LANGUAGES } from "../common/component/language-selector/support-languages";

@Component({
    selector: 'smsbox',
    template: require('./smsbox.component.html'),
    styles: [
        require('./smsbox.component.scss')
    ]
})
export class SmsBoxComponent {
    model: SMSBoxModel = new SMSBoxModel('', '');
    languages: LanguageModel[] = [];

    constructor() {

    }

    ngOnInit() {
        this.languages = SUPPORT_LANGUAGES;
    }

    onSubmit() {
    }
}
