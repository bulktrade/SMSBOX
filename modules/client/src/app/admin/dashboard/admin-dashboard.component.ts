import { Component } from "@angular/core";
import { AdminDashboardModel } from "../../common/component/dashboard/dashboard.model";
import { DashboardService } from "../../common/component/dashboard/dashboard.service";

@Component({
    selector: 'admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: [
        './admin-dashboard.component.scss'
    ],
    providers: [DashboardService]
})

export class AdminDashboardComponent {
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
