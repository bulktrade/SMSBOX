import { Component, Input } from "@angular/core";
import { AdminDashboardModel } from "./dashboard.model";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss'
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
