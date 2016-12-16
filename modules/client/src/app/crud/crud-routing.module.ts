import { CrudViewComponent } from './crud-view/crud-view.component';
import { CrudDeleteComponent } from './crud-delete/crud-delete.component';
import { CrudViewResolve } from './crud-view/crud-view.resolve';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudCreateComponent } from "./crud-create/crud-create.component";
import { CrudCreateResolve } from "./crud-create/crud-create.resolve";
import { CrudUpdateComponent } from "./crud-update/crud-update.component";
import { CrudUpdateResolve } from "./crud-update/crud-update.resolve";

const CRUD_ROUTE_PROVIDER = [
    {
        path: '',
        component: CrudViewComponent,
        resolve: { view: CrudViewResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'delete/:id',
        component: CrudDeleteComponent,
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'create/:serviceName',
        component: CrudCreateComponent,
        resolve: { create: CrudCreateResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
    {
        path: 'update/:id',
        component: CrudUpdateComponent,
        resolve: { update: CrudUpdateResolve },
        data: {
            showInBreadcrumb: false,
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(CRUD_ROUTE_PROVIDER)
    ],
    exports: [
        RouterModule
    ]
})
export class CrudRoutingModule {}
