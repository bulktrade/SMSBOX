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
    providers: [AuthService, LoginService]
})

export class LoginComponent {
    public forgotEmailAddress: string = '';
    public model: LoginModel = new LoginModel('', '');
    public toggle: boolean = false;
    public showSendMailSpinner: boolean = false;

    constructor(public router: Router,
                public location: Location,
                public authService: AuthService,
                public growlService: GrowlService,
                public loginService: LoginService) {
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

    restorePassword(email: string) {
        this.showSendMailSpinner = true;

        this.loginService.forgotPassword(email)
            .subscribe(res => {
                this.showSendMailSpinner = false;
                this.growlService.show({ severity: 'success', detail: 'forgotPassword.successMessage' });
            }, err => {
                this.showSendMailSpinner = false;
                console.error(err);

                switch (err.status) {
                    case 404:
                        this.growlService.show({ severity: 'error', detail: 'forgotPassword.userNotFound' });
                        break;
                    default:
                        console.error(err);
                        this.growlService.show({ severity: 'error', detail: 'forgotPassword.commonError' });
                        break;
                }
            });
    }

    back() {
        this.location.back();
    }

    ngOnDestroy() {
        this.showSendMailSpinner = false;
    }
}
