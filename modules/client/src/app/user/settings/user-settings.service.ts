import { Injectable } from "@angular/core";
import { UserSettingsModel } from "./user-settings.model";
import { FeathersService } from "../../services/feathers.service";
import { Observable } from "rxjs";
import { Response } from "@angular/http";
import { CommonService } from "../../services/common.service";

export const USER_SETTINGS_SERVICE_NAME = 'user';

@Injectable()
export class UserSettingsService {

    constructor(private feathersService: FeathersService,
                private commonService: CommonService) {
    }

    setUserSettings(settings: UserSettingsModel) {
        return Observable.create((observer) => {

            this.feathersService.update(this.commonService.getIDCurrentUser(), settings, USER_SETTINGS_SERVICE_NAME)
                .subscribe((data: Response) => {
                    observer.next(data.json());
                    observer.complete();
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }
}
