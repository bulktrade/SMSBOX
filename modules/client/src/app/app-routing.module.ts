import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { SmsBoxComponent } from "./smsbox/smsbox.component";
import { AppComponent } from "./app.component";

const ROUTES: Routes = [
    {path: '', component: AppComponent, children: [
        {
            path: '',
            component: SmsBoxComponent
        }
    ]}
    // {
    //     path: 'admin',
    //     component: AdminComponent,
    //     canActivate: [LoginGuard],
    //     data: {
    //         showNavigationBar: true
    //     },
    //     children: [
    //         {
    //             path: '',
    //             component: AdminViewComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'ADMIN_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //         },
    //         {
    //             path: 'user',
    //             component: UsersComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'ADMIN_USER_BREADCRUMB_TITLE',
    //                 showNavigationBar: true,
    //                 feathersService: 'users'
    //             },
    //             children: [
    //                 {
    //                     path: '',
    //                     component: CrudComponent,
    //                     loadChildren: () => CrudModule,
    //                     resolve: { crud: CrudMainResolve },
    //                     data: {
    //                         showInBreadcrumb: false
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'dashboard',
    //             component: AdminDashboardComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'ADMIN_DASHBOARD_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //         },
    //         {
    //             path: 'spam-filter',
    //             component: AdminSpamFilterComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'ADMIN_SPAM_FILTER_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //         },
    //         {
    //             path: 'settings',
    //             component: AdminSettingsComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'ADMIN_SETTINGS_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //         }
    //     ]
    // },
    // {
    //     path: 'user',
    //     component: UserComponent,
    //     data: {
    //         showInBreadcrumb: false,
    //         showNavigationBar: true
    //     },
    //     children: [
    //         {
    //             path: '',
    //             component: UserViewComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'USER_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //         },
    //         {
    //             path: 'dashboard',
    //             component: UserDashboardComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'USER_DASHBOARD_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //         },
    //         {
    //             path: 'message',
    //             component: MessageComponent,
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'USER_MESSAGE_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             },
    //             children: [
    //                 {
    //                     path: '',
    //                     component: IOBoxComponent,
    //                     data: {
    //                         showInBreadcrumb: false,
    //                         translationKey: 'USER_MESSAGE_BREADCRUMB_TITLE',
    //                         showNavigationBar: false
    //                     }
    //                 },
    //                 {
    //                     path: ':telephoneNumber',
    //                     component: ChatComponent,
    //                     data: {
    //                         showInBreadcrumb: false,
    //                         translationKey: 'USER_MESSAGE_BREADCRUMB_TITLE',
    //                         showNavigationBar: false
    //                     }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'settings',
    //             component: UserSettingsComponent,
    //             resolve: { userSettings: UserSettingsResolve },
    //             data: {
    //                 showInBreadcrumb: true,
    //                 translationKey: 'USER_SETTINGS_BREADCRUMB_TITLE',
    //                 showNavigationBar: true
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: 'there',
    //     component: ThereComponent,
    //     data: {
    //         showInBreadcrumb: false
    //     },
    // },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    // {
    //     path: 'signup',
    //     component: SignupComponent
    // },
    // {
    //     path: "**",
    //     component: NotFoundComponent
    // }
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
