import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Message } from "primeng/components/common/api";
import { TranslateService } from "ng2-translate";
import { CrudService } from "../crud.service";
import { ActivatedRoute } from "@angular/router";
import { GrowlService } from "../../services/growl/growl.service";

@Component({
    selector: 'crud-delete',
    template: require('./crud-delete.component.html'),
    styles: [
        require('./crud-delete.component.scss')
    ],
    providers: [],
})

export class CrudDeleteComponent {
    id: string = null;

    constructor(private location: Location,
                private translate: TranslateService,
                private crudService: CrudService,
                private route: ActivatedRoute,
                private growlService: GrowlService) {
    }

    ngOnInit() {
        this.growlService.show({ severity: 'warn', detail: 'crud.confirmDeleteMsg' });

        this.id = this.route.params['value'].id;
    }

    deleteRow() {
        this.crudService.gridOptions.rowData.forEach((item, index, object) => {
            if (item.id === this.id) {
                object.splice(index, 1);
            }
        });

        this.location.back();
    }
}
