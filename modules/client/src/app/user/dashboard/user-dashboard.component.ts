import { Component } from "@angular/core";
import { DashboardService } from "../../common/component/dashboard/dashboard.service";
import { AdminDashboardModel } from "../../common/component/dashboard/dashboard.model";

@Component({
    selector: 'user-dashboard',
    template: require('./user-dashboard.component.html'),
    styles: [
        require('./user-dashboard.component.scss')
    ],
    providers: [DashboardService]
})

export class UserDashboardComponent {
    dashboardBoxes: AdminDashboardModel[];

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.dashboardService.getDashboardBoxes()
            .subscribe(boxes => {
                this.dashboardBoxes = boxes;
            });
    }
}
