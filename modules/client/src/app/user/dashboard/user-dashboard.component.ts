import { Component } from "@angular/core";

@Component({
    selector: 'dashboard',
    template: require('./user-dashboard.component.html'),
    styles: [
        require('./user-dashboard.component.scss')
    ]
})

export class UserDashboardComponent {
    constructor() {

    }
}
