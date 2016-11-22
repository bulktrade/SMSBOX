import {Component} from "@angular/core";

@Component({
    selector: 'spamFilter',
    template: require('./admin-spam-filter.component.html'),
    styles: [
        require('../../common/content.scss'),
        require('./admin-spam-filter.component.scss')
    ]
})

export class AdminSpamFilterComponent {
    constructor() {

    }
}