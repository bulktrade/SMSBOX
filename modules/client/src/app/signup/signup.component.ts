import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { SignupService } from "./signup-service";
import { SignupModel } from "./signup.model";

@Component({
    selector: 'signup',
    template: require('./signup.component.html'),
    styles: [
        require('./signup.component.scss')
    ]
})

export class SignupComponent {
    public model: SignupModel = new SignupModel('', '', '', '');

    constructor(private signupService: SignupService,
                public location: Location) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.signupService.registerUser(this.model);
    }

    back() {
        this.location.back();
    }
}
