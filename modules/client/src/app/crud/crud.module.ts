import { NgModule, ModuleWithProviders } from "@angular/core";
import { CrudComponent } from "./crud.component";
import { CrudViewComponent } from "./crud-view/crud-view.component";
import { AlertModule } from "ng2-bootstrap";
import { AgGridModule } from "ag-grid-ng2";
import { FormsModule } from "@angular/forms";
import { CrudRoutingModule } from "./crud-routing.module";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { PanelModule } from "primeng/components/panel/panel";
import { InputTextModule } from "primeng/components/inputtext/inputtext";
import { ButtonModule } from "primeng/components/button/button";
import { MessagesModule } from "primeng/components/messages/messages";
import { CrudDeleteComponent } from "./crud-delete/crud-delete.component";
import { CrudCreateComponent } from "./crud-create/crud-create.component";
import { DynamicFormModule } from "./dynamic-form/dynamic-form.component";
import { CrudUpdateComponent } from "./crud-update/crud-update.component";
import { PaginatorModule } from "primeng/components/paginator/paginator";

const CRUD_DECLARATIONS = [
    CrudComponent,
    CrudViewComponent,
    CrudDeleteComponent,
    CrudCreateComponent,
    CrudUpdateComponent
];

const CRUD_MODULES = [
    AlertModule,
    DynamicFormModule,
    FormsModule,
    CommonModule,
    TranslateModule,
    AgGridModule.withComponents([]),
    CrudRoutingModule,
    PanelModule,
    InputTextModule,
    MessagesModule,
    ButtonModule,
    PaginatorModule
];

@NgModule({
    imports: [
        CRUD_MODULES,
    ],
    exports: [CRUD_DECLARATIONS],
    declarations: [CRUD_DECLARATIONS]
})
export class CrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CrudModule
        };
    }
}
