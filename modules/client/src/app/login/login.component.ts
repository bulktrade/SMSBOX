import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { LoginModel } from "./login.model";
import { FeathersService } from "../services/feathers.service";
import { GrowlService } from "../services/growl/growl.service";
import { Response } from "@angular/http";

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [
        require('./login.component.scss')
    ],
    providers: [GrowlService]
})

export class LoginComponent {
    public model: LoginModel = new LoginModel('', '');

    constructor(private router: Router,
                private location: Location,
                private feathersService: FeathersService,
                private growlService: GrowlService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.feathersService.authentication(this.model)
            .subscribe((res) => {
                this.router.navigateByUrl('/admin');
            }, (err: Response) => {
                switch (err.status) {
                    case 401:
                        this.growlService.show({ severity: 'error', detail: 'login.userNotFound' });
                        break;
                    default:
                        console.log(err);
                        this.growlService.show({ severity: 'error', detail: 'login.commonError' });
                        break;
                }
            });
    }

    back() {
        this.location.back();
    }
}