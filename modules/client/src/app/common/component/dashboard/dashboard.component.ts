import { Component, Input } from "@angular/core";
import { AdminDashboardModel } from "./dashboard.model";

@Component({
    selector: 'dashboard',
    template: require('./dashboard.component.html'),
    styles: [
        require('./dashboard.component.scss')
    ],
    providers: []
})

export class DashboardComponent {
    @Input('dashboardBoxes') dashboardBoxes: AdminDashboardModel[];

    constructor() {
    }

    ngOnInit() {
    }
}
