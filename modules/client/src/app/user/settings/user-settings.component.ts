import { Component } from "@angular/core";
import { UserSettingsModel } from "./user-settings.model";
import { UserSettingsService } from "./user-settings.service";
import { ActivatedRoute } from "@angular/router";
import { MessageModel } from "../../common/model/message";

@Component({
    selector: 'settings',
    template: require('./user-settings.component.html'),
    styles: [
        require('./user-settings.component.scss')
    ]
})

export class UserSettingsComponent {
    public messageModel: MessageModel = new MessageModel(false, false);
    public model: UserSettingsModel = new UserSettingsModel('', '', '', '', '', '', '');

    constructor(public userSettingsService: UserSettingsService,
                private route: ActivatedRoute) {

    }

    ngOnInit() {
    }

    onSubmit(event) {
        if (event.valid) {
            this.messageModel.successMessage = true;
            this.userSettingsService.setUserSettings(this.model)
                .subscribe(data => {
                    this.messageModel.successMessage = true;
                }, err => {
                    console.error(err);
                    this.messageModel.errorMessage = true;
                });
        }
    }
}