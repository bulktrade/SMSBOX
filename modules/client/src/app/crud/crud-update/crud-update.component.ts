import { Component } from "@angular/core";
import { ColDef } from "ag-grid";
import { ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { FeathersService } from "../../services/feathers.service";
import { GrowlService } from "../../services/growl/growl.service";

@Component({
    selector: 'crud-update',
    template: require('./crud-update.component.html'),
    styles: [
        require('./crud-update.component.scss')
    ],
    providers: [GrowlService]
})

export class CrudUpdateComponent {
    id: string;
    columnDefs: ColDef[] = [];
    model = {};

    constructor(private route: ActivatedRoute,
                private crudService: CrudService,
                private feathersService: FeathersService,
                private growlService: GrowlService) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.id = params['id'];
            });

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
        if (!(model instanceof Event)) {
            this.feathersService.update(this.id, model, this.crudService.getFeathersServiceName()).subscribe(data => {
                this.growlService.show({ severity: 'success', detail: 'crud.successUpdate' });
            }, err => {
                console.error(err);
                this.growlService.show({ severity: 'error', detail: 'crud.errorUpdate' });
            });
        }
    }
}
