import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";
import { LoginModel } from "./login.model";

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [
        require('./login.component.scss')
    ]
})

export class LoginComponent {
    public model: LoginModel = new LoginModel('', '');

    constructor(private router: Router,
                private loginService: LoginService,
                private location: Location) {
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.loginService.checkLoginData(this.model)) {
            this.router.navigate(['admin']);
        }
    }

    back() {
        this.location.back();
    }
}