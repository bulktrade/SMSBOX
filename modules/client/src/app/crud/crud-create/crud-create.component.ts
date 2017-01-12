import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FeathersService } from "../../services/feathers.service";
import { GrowlService } from "../../services/growl/growl.service";
import { CrudService } from "../crud.service";
import { ColFormDefs } from "../model/column/column-form";

@Component({
    selector: 'crud-create',
    templateUrl: './crud-create.component.html',
    styleUrls: [
        './crud-create.component.scss'
    ],
    providers: []
})

export class CrudCreateComponent {
    columnDefs: ColFormDefs[] = [];

    constructor(private route: ActivatedRoute,
                private crudService: CrudService,
                private feathersService: FeathersService,
                private growlService: GrowlService) {
    }

    ngOnInit() {
        this.columnDefs = this.getColumnDefs();
    }

    getColumnDefs() {
        return this.route.snapshot.data['create'].columnDefs;
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
