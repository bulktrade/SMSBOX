import { Component } from '@angular/core';
import { ColDef } from "ag-grid";
import { ActivatedRoute } from "@angular/router";
import { TypeOfDynamicForm } from "../dynamic-form/enum/type-of-dynamic-form";
import { CrudService } from "../crud.service";

@Component({
    selector: 'crud-update',
    template: require('./crud-update.component.html'),
    styles: [
        require('./crud-update.component.scss')
    ],
    providers: []
})

export class CrudUpdateComponent {
    formType: TypeOfDynamicForm = TypeOfDynamicForm.Updte;
    columnDefs: ColDef[] = [];
    model = {};

    constructor(private route: ActivatedRoute,
                private crudService: CrudService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
        this.model = this.getModel() || {};
    }

    getColumnDefs() {
        return this.route.snapshot.data['update'].columnDefs || [];
    }

    getModel() {
        return this.route.snapshot.data['update'].rowData[0] || {};
    }

    updateRecord(model) {
        if (!(model instanceof Event)){
            this.crudService.gridOptions.rowData = this.crudService.gridOptions.rowData.map(row => {
                if (row.id === model.id) {
                    row = model;
                }

                return row;
            });
        }
    }
}
