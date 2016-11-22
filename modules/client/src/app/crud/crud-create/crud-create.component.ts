import { Component } from '@angular/core';
import { ColDef } from "ag-grid";
import { ActivatedRoute } from "@angular/router";
import { TypeOfDynamicForm } from "../dynamic-form/enum/type-of-dynamic-form";
import { CrudService } from "../crud.service";

@Component({
    selector: 'crud-create',
    template: require('./crud-create.component.html'),
    styles: [
        require('./crud-create.component.scss')
    ],
    providers: []
})

export class CrudCreateComponent {
    formType: TypeOfDynamicForm = TypeOfDynamicForm.Create;
    columnDefs: ColDef[] = [];
    model = {};

    constructor(private route: ActivatedRoute,
                private crudService: CrudService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
    }

    getColumnDefs() {
        return this.route.snapshot.data['create'];
    }

    createRecord(model) {
        if (!(model instanceof Event)){
            this.crudService.gridOptions.rowData.push(model);
        }
    }
}
