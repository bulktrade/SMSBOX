import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, ResponseOptions, Response } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { HTTP_PROVIDERS } from "../../test/unit/mock/http-providers";
import { DashboardService } from "./dashboard.service";

describe('Dashboard service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardService,
                HTTP_PROVIDERS
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should get messages',
        inject([DashboardService, MockBackend], (dashboardService: DashboardService, backend: MockBackend) => {
            let messages = [
                {
                    "type": "status",
                    "contains": "users",
                    "title": "dashboardStatus.usersTitle",
                    "colorScheme": "#697882",
                    "iconName": "fa-users",
                    "data": "Count of all users"
                },
                {
                    "type": "chart",
                    "contains": "users",
                    "title": "dashboardChart.usersTitle",
                    "colorScheme": "#4189e6",
                    "iconName": "fa-user",
                    "data": {
                        "labels": ["January", "February", "March", "April", "May", "June", "July"],
                        "datasets": [
                            {
                                "label": "First Dataset",
                                "data": [65, 59, 60, 10, 56, 55, 40],
                                "fill": false,
                                "borderColor": "#4bc0c0"
                            },
                            {
                                "label": "Second Dataset",
                                "data": [28, 25, 36, 19, 90, 27, 90],
                                "fill": false,
                                "borderColor": "#565656"
                            }
                        ]
                    }
                },
            ];

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: JSON.stringify(messages) });
                c.mockRespond(new Response(response));
            });

            dashboardService.getDashboardBoxes()
                .subscribe((res) => {
                    expect(res[0].type).toEqual('status');
                    expect(res[1].type).toEqual('chart');
                })

        }));

});
