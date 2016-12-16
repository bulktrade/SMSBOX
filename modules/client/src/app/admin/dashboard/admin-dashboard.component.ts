import {Component} from "@angular/core";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminDashboardModel } from "./admin-dashboard.model";

@Component({
    selector: 'dashboard',
    template: require('./admin-dashboard.component.html'),
    styles: [
        require('./admin-dashboard.component.scss')
    ],
    providers: [AdminDashboardService]
})

export class AdminDashboardComponent {
    dashboardBoxes: AdminDashboardModel[] = [];

    constructor(public dashboardService: AdminDashboardService) {
    }

    ngOnInit() {
        this.dashboardService.getDashboardBoxes()
            .subscribe((dashboardBoxes: AdminDashboardModel[]) => {
                this.dashboardBoxes = dashboardBoxes;
            });
    }
}