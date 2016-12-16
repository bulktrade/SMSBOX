import { Component, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/components/common/api";
import { ADMIN_ITEMS } from "./admin-menu-items";

@Component({
    selector: 'admin',
    encapsulation: ViewEncapsulation.None,
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
    styles: [
        require('./admin.component.scss')
    ]
})

export class AdminComponent {
    private items: MenuItem[];

    constructor() {

    }

    ngOnInit() {
        this.items = ADMIN_ITEMS;
    }
}
