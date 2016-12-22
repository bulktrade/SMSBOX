import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { ThereComponent } from "./there/there.component";
import { AdminViewComponent } from "./admin/admin-view/admin-view.component";
import { AdminSpamFilterComponent } from "./admin/spamFilter/admin-spam-filter.component";
import { UsersComponent } from "./admin/users/admin-users.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MessageComponent } from "./user/message/message.component";
import { UserDashboardComponent } from "./user/dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./admin/dashboard/admin-dashboard.component";
import { AdminSettingsComponent } from "./admin/settings/admin-settings.component";
import { UserSettingsComponent } from "./user/settings/user-settings.component";
import { SmsBoxComponent } from "./smsbox/smsbox.component";
import { SignupComponent } from "./signup/signup.component";
import { UserViewComponent } from "./user/user-view/user-view.component";
import { IOBoxComponent } from "./user/message/iobox/iobox.component";
import { ChatComponent } from "./user/message/chat/chat.component";
import { CrudComponent } from "./crud/crud.component";
import { CrudModule } from "./crud/crud.module";
import { LoginGuard } from "./login/login.guard";
import { CrudMainResolve } from "./crud/crud.resolve";
import { UserSettingsResolve } from "./user/settings/user-settings.resolve";

const ROUTES: Routes = [
    {
        path: '',
        component: SmsBoxComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [LoginGuard],
        data: {
            showNavigationBar: true
        },
        children: [
            {
                path: '',
                component: AdminViewComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'ADMIN_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
            },
            {
                path: 'user',
                component: UsersComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'ADMIN_USER_BREADCRUMB_TITLE',
                    showNavigationBar: true,
                    feathersService: 'users'
                },
                children: [
                    {
                        path: '',
                        component: CrudComponent,
                        loadChildren: () => CrudModule,
                        resolve: { crud: CrudMainResolve },
                        data: {
                            showInBreadcrumb: false
                        }
                    }
                ]
            },
            {
                path: 'dashboard',
                component: AdminDashboardComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'ADMIN_DASHBOARD_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
            },
            {
                path: 'spam-filter',
                component: AdminSpamFilterComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'ADMIN_SPAM_FILTER_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
            },
            {
                path: 'settings',
                component: AdminSettingsComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'ADMIN_SETTINGS_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
            }
        ]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [LoginGuard],
        data: {
            showInBreadcrumb: false,
            showNavigationBar: true
        },
        children: [
            {
                path: '',
                component: UserViewComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'USER_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
            },
            {
                path: 'dashboard',
                component: UserDashboardComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'USER_DASHBOARD_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
            },
            {
                path: 'message',
                component: MessageComponent,
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'USER_MESSAGE_BREADCRUMB_TITLE',
                    showNavigationBar: true
                },
                children: [
                    {
                        path: '',
                        component: IOBoxComponent,
                        data: {
                            showInBreadcrumb: false,
                            translationKey: 'USER_MESSAGE_BREADCRUMB_TITLE',
                            showNavigationBar: false
                        }
                    },
                    {
                        path: ':telephoneNumber',
                        component: ChatComponent,
                        data: {
                            showInBreadcrumb: false,
                            translationKey: 'USER_MESSAGE_BREADCRUMB_TITLE',
                            showNavigationBar: false
                        }
                    }
                ]
            },
            {
                path: 'settings',
                component: UserSettingsComponent,
                resolve: { userSettings: UserSettingsResolve },
                data: {
                    showInBreadcrumb: true,
                    translationKey: 'USER_SETTINGS_BREADCRUMB_TITLE',
                    showNavigationBar: true
                }
            }
        ]
    },
    {
        path: 'there',
        component: ThereComponent,
        data: {
            showInBreadcrumb: false
        },
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
