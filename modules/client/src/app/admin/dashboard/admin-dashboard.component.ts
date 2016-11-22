import {Component} from "@angular/core";

@Component({
    selector: 'dashboard',
    template: require('./admin-dashboard.component.html'),
    styles: [
        require('../../common/content.scss'),
        require('./admin-dashboard.component.scss')
    ]
})

export class AdminDashboardComponent {
    constructor() {

    }
}