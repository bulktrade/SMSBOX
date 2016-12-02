import { Component } from "@angular/core";
import { ColDef } from "ag-grid";
import { ActivatedRoute } from "@angular/router";
import { TypeOfDynamicForm } from "../dynamic-form/enum/type-of-dynamic-form";
import { FeathersService } from "../../services/feathers.service";
import { GrowlService } from "../../services/growl/growl.service";
import { CrudService } from "../crud.service";

@Component({
    selector: 'crud-create',
    template: require('./crud-create.component.html'),
    styles: [
        require('./crud-create.component.scss')
    ],
    providers: [GrowlService]
})

export class CrudCreateComponent {
    formType: TypeOfDynamicForm = TypeOfDynamicForm.Create;
    columnDefs: ColDef[] = [];

    constructor(private route: ActivatedRoute,
                private crudService: CrudService,
                private feathersService: FeathersService,
                private growlService: GrowlService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
    }

    getColumnDefs() {
        return this.route.snapshot.data['create'];
    }

    createRecord(model) {
        if (!(model instanceof Event)) {
            this.feathersService.create(model, this.crudService.getFeathersServiceName()).subscribe(data => {
                this.growlService.show({ severity: 'success', detail: 'crud.successCreate' });
            }, err => {
                console.error(err);
                this.growlService.show({ severity: 'error', detail: 'crud.errorCreate' });
            });
        }
    }
}
