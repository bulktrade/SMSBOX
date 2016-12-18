import { Component, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { GrowlService } from "./services/growl/growl.service";

@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    template: `
        <p-growl [value]="growlService.msgs"></p-growl>
        <router-outlet></router-outlet>
    `,
    styles: [
        require('./app.component.scss'),
        require('webpack-material-design-icons/material-design-icons.css'),
        require('font-awesome/css/font-awesome.css'),
        require('primeng/resources/themes/omega/theme.css'),
        require('primeng/resources/primeng.min.css'),
        require('ag-grid/dist/styles/ag-grid.css'),
        require('ag-grid/dist/styles/theme-fresh.css')
    ]
})

export class AppComponent {
    constructor(private translate: TranslateService,
                private growlService: GrowlService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
