import { Component } from "@angular/core";
import { MenuItem } from "primeng/components/common/api";
import { USER_ITEMS } from "./user-menu-items";

@Component({
    selector: 'user',
    template: `
        <div id="user-module">
            <navbar [items]="items"></navbar>
            <div class="container">
                <div class="main-wrap">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    styles: [
        require('./user.component.scss')
    ]
})

export class UserComponent {
    items: MenuItem[];

    constructor() {
    }

    ngOnInit() {
        this.items = USER_ITEMS;
    }
}
