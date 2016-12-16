import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateService, TranslateModule } from "ng2-translate";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdminViewComponent } from "./admin-view/admin-view.component";
import { AdminSpamFilterComponent } from "./spamFilter/admin-spam-filter.component";
import { AdminDashboardComponent } from "./dashboard/admin-dashboard.component";
import { AdminSettingsComponent } from "./settings/admin-settings.component";
import { BreadcrumbModule } from "../breadcrumb/breadcrumb.component";
import { UsersComponent } from "./users/admin-users.component";
import { ChartModule } from "primeng/components/chart/chart";
import { ButtonModule } from "primeng/components/button/button";
import { MenubarModule } from "primeng/components/menubar/menubar";

const ADMIN_DECLARATION = [
    AdminComponent,
    AdminViewComponent,
    UsersComponent,
    AdminDashboardComponent,
    AdminSettingsComponent,
    AdminSpamFilterComponent,
];

@NgModule({
    imports: [
        BrowserModule,
        TranslateModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbModule,
        ChartModule,
        ButtonModule,
        MenubarModule
    ],
    declarations: [
        ADMIN_DECLARATION
    ],
    exports: [
        ADMIN_DECLARATION
    ],
    providers: [
        TranslateService,
        FormBuilder
    ]
})

export class AdminComponentModule {

}