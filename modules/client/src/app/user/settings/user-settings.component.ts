import { Component } from "@angular/core";
import { UserSettingsModel } from "./user-settings.model";
import { UserSettingsService } from "./user-settings.service";
import { ActivatedRoute } from "@angular/router";
import { GrowlService } from "../../services/growl/growl.service";

@Component({
    selector: 'settings',
    template: require('./user-settings.component.html'),
    styles: [
        require('./user-settings.component.scss')
    ],
    providers: [GrowlService]
})

export class UserSettingsComponent {
    public model: UserSettingsModel = new UserSettingsModel('', '', '', '', '', '', '');

    constructor(public userSettingsService: UserSettingsService,
                private route: ActivatedRoute,
                private growlService: GrowlService) {

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