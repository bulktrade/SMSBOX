import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateService, TranslateModule} from "ng2-translate";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {UserComponentModule} from "../user/user.module";
import {AdminViewComponent} from "./admin-view.component";
import {AdminSpamFilterComponent} from "./spamFilter/admin-spam-filter.component";
import {AdminDashboardComponent} from "./dashboard/admin-dashboard.component";
import {AdminSettingsComponent} from "./settings/admin-settings.component";
import {BreadcrumbModule} from "../breadcrumb/breadcrumb.component";
import {
    NavigationBarComponent,
    NavigationBarComponentModule
} from "../navigation/navigationBar/navigation-bar.component";
import {UsersComponent} from "./users/admin-users.component";

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
        UserComponentModule,
        BreadcrumbModule,
        NavigationBarComponentModule
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