import { Component, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/components/common/api";
import { ADMIN_ITEMS } from "./admin-menu-items";
import { LanguageModel } from "../language-selector/language-selector.model";
import { SUPPORT_LANGUAGES } from "../language-selector/support-languages";

@Component({
    selector: 'admin',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div id="admin-module">
            <div class="menubar">
                <div class="container" style="display: flex;">
                    <div style="flex-grow: 7;"><p-menubar [model]="items"></p-menubar></div>
                    <language-selector [languages]="languages"></language-selector>
                </div>
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
    languages: LanguageModel[] = [];

    constructor() {
    }

    ngOnInit() {
        this.items = ADMIN_ITEMS;
        this.languages = SUPPORT_LANGUAGES;
    }
}
