import { Component } from "@angular/core";

@Component({
    selector: 'user',
    template: "<navigation-bar></navigation-bar><router-outlet></router-outlet>"
})

export class UserComponent {
    constructor() {

    }
}