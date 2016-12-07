import { Component } from "@angular/core";

@Component({
    selector: 'user',
    template: `
        <div id="user-window" class="main-content-padding">
            <breadcrumb></breadcrumb>
            <router-outlet></router-outlet>
        </div>
    `
})

export class UsersComponent {
    constructor() {
    }
}
