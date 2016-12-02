import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { TranslateService } from "ng2-translate";
import { CrudService } from "../crud.service";
import { ActivatedRoute } from "@angular/router";
import { GrowlService } from "../../services/growl/growl.service";
import { FeathersService } from "../../services/feathers.service";
import { Message } from "primeng/components/common/api";

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
    msgs: Message[] = [];

    constructor(private location: Location,
                private translate: TranslateService,
                private crudService: CrudService,
                private route: ActivatedRoute,
                private growlService: GrowlService,
                private feathersService: FeathersService) {
    }

    ngOnInit() {
        this.translate.get('crud.confirmDeleteMsg')
            .subscribe(detail => {
                this.msgs.push({ severity: 'warn', detail: detail });
            });

        this.route.params.subscribe(params => {
            this.id = params['id']
        });
    }

    deleteRow() {
        this.feathersService.remove(this.id, 'users')
            .subscribe(data => {
                this.growlService.show({ severity: 'success', detail: 'crud.successDelete' });
                this.location.back();
            }, err => {
                console.error(err);
                this.growlService.show({ severity: 'error', detail: 'crud.errorDelete' });
            });
    }
}
