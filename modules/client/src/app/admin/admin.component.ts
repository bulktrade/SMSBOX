import {Component} from "@angular/core";

@Component({
    selector: 'admin',
    template: "<navigation-bar></navigation-bar><router-outlet></router-outlet>",
})

export class AdminComponent {
    constructor() {

    }
}