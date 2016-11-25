import { Component } from "@angular/core";
import { SMSBoxModel } from "./smsbox.model";

@Component({
    selector: 'smsbox',
    template: require('./smsbox.component.html'),
    styles: [
        require('../common/content.scss'),
        require('./smsbox.component.scss')
    ]
})
export class SmsBoxComponent {
    model: SMSBoxModel = new SMSBoxModel('', '');

    constructor() {

    }

    onSubmit() {
    }
}