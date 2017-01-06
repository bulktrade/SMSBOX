import { Component } from "@angular/core";
import { UserSettingsModel } from "./user-settings.model";
import { UserSettingsService } from "./user-settings.service";
import { ActivatedRoute } from "@angular/router";
import { GrowlService } from "../../services/growl/growl.service";

@Component({
    selector: 'settings',
    templateUrl: './user-settings.component.html',
    styleUrls: [
        './user-settings.component.scss'
    ],
    providers: []
})

export class UserSettingsComponent {
    public model: UserSettingsModel = new UserSettingsModel('', '', '', '', '', '', '');

    constructor(public userSettingsService: UserSettingsService,
                public route: ActivatedRoute,
                public growlService: GrowlService) {

    }

    ngOnInit() {
        this.model = this.getModel();
    }

    getModel() {
        return this.route.snapshot.data['userSettings'];
    }

    onSubmit(event) {
        if (event.valid) {
            this.userSettingsService.setUserSettings(this.model)
                .subscribe(data => {
                    this.growlService.show({ severity: 'success', detail: 'userSettings.successMessage' });
                }, err => {
                    console.error(err);
                    this.growlService.show({ severity: 'error', detail: 'userSettings.errorMessage' });
                });
        }
    }
}
