import { Injectable } from "@angular/core";
import { CrudResolve } from "../../crud/common/crud-resolve";
import { FeathersService } from "../../services/feathers.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CommonService } from "../../services/common.service";
import { USER_SETTINGS_SERVICE_NAME } from "./user-settings.service";
import { Observable } from "rxjs";
import { Response } from "@angular/http";

@Injectable()
export class UserSettingsResolve extends CrudResolve {

    constructor(private commonService: CommonService,
                private feathersService: FeathersService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer) => {
            this.feathersService.get(this.commonService.getIDCurrentUser(), USER_SETTINGS_SERVICE_NAME)
                .subscribe((res: Response) => {
                    observer.next(res.json());
                    observer.complete();
                }, err => {
                    observer.error(err);
                    observer.complete();
                });
        });
    }

}
