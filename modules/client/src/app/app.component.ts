import { Component, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { GrowlService } from "./services/growl/growl.service";
import "flag-icon-css/css/flag-icon.css";

@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    template: `
        <p-growl [value]="growlService.msgs"></p-growl>
        <router-outlet></router-outlet>
    `,
    styleUrls: [
        './app.component.scss',
        '../../node_modules/flag-icon-css/css/flag-icon.css',
        '../../node_modules/webpack-material-design-icons/material-design-icons.css',
        '../../node_modules/font-awesome/css/font-awesome.css',
        '../../node_modules/primeng/resources/themes/omega/theme.css',
        '../../node_modules/primeng/resources/primeng.min.css',
        '../../node_modules/ag-grid/dist/styles/ag-grid.css',
        '../../node_modules/ag-grid/dist/styles/theme-fresh.css'
    ]
})

export class AppComponent {
    constructor(public translate: TranslateService,
                public growlService: GrowlService) {
        translate.setDefaultLang('us');
        translate.use('us');
    }
}
