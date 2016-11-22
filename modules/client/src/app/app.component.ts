import {Component, ViewEncapsulation} from "@angular/core";
import {TranslateService} from "ng2-translate";

@Component({
    selector: "app",
    encapsulation: ViewEncapsulation.None,
    template: "<router-outlet></router-outlet>",
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
    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
