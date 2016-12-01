import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "ng2-translate";
import { CrudService } from "../crud.service";
import { ActivatedRoute } from "@angular/router";
import { GrowlService } from "../../services/growl/growl.service";
import { FeathersService } from "../../services/feathers.service";

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
                private growlService: GrowlService,
                private feathersService: FeathersService) {
    }

    ngOnInit() {
        this.growlService.show({ severity: 'warn', detail: 'crud.confirmDeleteMsg' });

        this.route.params.subscribe(params => {
            this.id = params['id']
        });
    }

    deleteRow() {
        this.feathersService.remove(this.id, 'users')
            .subscribe(data => {
                this.location.back();
            }, err => {
                console.error(err);
            });
    }
}
