import {Component} from "@angular/core";

@Component({
    selector: 'settings',
    template: require('./admin-settings.component.html'),
    styles: [
        require('./admin-settings.component.scss')
    ]
})

export class AdminSettingsComponent {
    constructor() {

    }
}