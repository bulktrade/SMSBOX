import { Component } from "@angular/core";

@Component({
    selector: 'user',
    template: `
        <div class="main-wrap">
            <div class="inner-wrap">
                <breadcrumb></breadcrumb>
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})

export class UsersComponent {
    constructor() {
    }
}