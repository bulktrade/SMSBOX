import { Component } from "@angular/core";
import { MenuItem } from "primeng/components/common/api";
import { USER_ITEMS } from "./user-menu-items";

@Component({
    selector: 'user',
    template: `
        <div id="admin-module">
            <div class="menubar">
                <p-menubar class="container" [model]="items"></p-menubar>
            </div>
            <div class="container">
                <div class="main-wrap">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
})

export class UserComponent {
    private items: MenuItem[];

    constructor() {

    }

    ngOnInit() {
        this.items = USER_ITEMS;
    }
}