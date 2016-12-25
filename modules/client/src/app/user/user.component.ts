import { Component } from "@angular/core";
import { MenuItem } from "primeng/components/common/api";
import { USER_ITEMS } from "./user-menu-items";
import { NavbarService } from "../common/component/navbar/navbar.service";

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

    constructor(private navbarService: NavbarService) {
    }

    ngOnInit() {
        this.navbarService.translateItems(USER_ITEMS)
            .subscribe(items => {
                this.items = items;
            });
    }
}
