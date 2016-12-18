import { NgModule, ModuleWithProviders } from "@angular/core";
import { CrudComponent } from "./crud.component";
import { CrudViewComponent } from "./crud-view/crud-view.component";
import { CrudRoutingModule } from "./crud-routing.module";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { CrudDeleteComponent } from "./crud-delete/crud-delete.component";
import { CrudCreateComponent } from "./crud-create/crud-create.component";
import { DynamicFormModule } from "./dynamic-form/dynamic-form.component";
import { CrudUpdateComponent } from "./crud-update/crud-update.component";
import { CrudViewService } from "./crud-view/crud.view.service";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule } from "@angular/router";
import { ChartModule } from "primeng/components/chart/chart";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        ChartModule
    ],
    exports: [DashboardComponent],
    declarations: [DashboardComponent]
})
export class DashboardModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DashboardModule
        };
    }
}
