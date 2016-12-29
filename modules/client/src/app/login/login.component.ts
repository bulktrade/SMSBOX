import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { LoginModel } from "./login.model";
import { GrowlService } from "../services/growl/growl.service";
import { Response } from "@angular/http";
import { AuthService } from "../services/auth/auth.service";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: [
        './login.component.scss',
        './../common/style/login-form.scss'
    ],
    providers: [AuthService]
})

export class LoginComponent {
    public model: LoginModel = new LoginModel('', '');

    constructor(public router: Router,
                public location: Location,
                public authService: AuthService,
                public growlService: GrowlService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.authService.login(this.model)
            .subscribe((res) => {
                this.router.navigateByUrl('/admin');
            }, (err: Response) => {
                switch (err.status) {
                    case 401:
                        this.growlService.show({ severity: 'error', detail: 'login.userNotFound' });
                        break;
                    default:
                        console.error(err);
                        this.growlService.show({ severity: 'error', detail: 'login.commonError' });
                        break;
                }
            });
    }

    back() {
        this.location.back();
    }
}
