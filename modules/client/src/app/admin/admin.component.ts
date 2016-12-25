import { Component, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/components/common/api";
import { ADMIN_ITEMS } from "./admin-menu-items";
import { NavbarService } from "../common/component/navbar/navbar.service";

@Component({
    selector: 'admin',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div id="admin-module">
            <div class="menubar">
                <navbar [items]="items"></navbar>
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
    items: MenuItem[];

    constructor(private navbarService: NavbarService) {
    }

    ngOnInit() {
        this.navbarService.translateItems(ADMIN_ITEMS)
            .subscribe(items => {
                this.items = items;
            });
    }
}
