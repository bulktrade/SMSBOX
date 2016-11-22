import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { ColDef } from "ag-grid";
import { TypeOfDynamicForm } from "./enum/type-of-dynamic-form";
import { GrowlService } from "../../services/growl/growl.service";
import { TranslateService } from "ng2-translate";

@Component({
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [
        require('./dynamic-form.component.scss')
    ],
    providers: [GrowlService],
})

export class DynamicFormComponent {
    @Input('columnDefs') columnDefs: ColDef[];
    @Input('type') type: TypeOfDynamicForm;
    @Input('model') model = {};

    @Output('submit') submit = new EventEmitter();

    constructor(private location: Location,
                private growlService: GrowlService,
                private translate: TranslateService) {
    }

    onSubmit() {
        this.growlService.show({ severity: 'success', detail: 'userSettings.successMessage' });
        this.submit.emit(this.model);
    }

    ngOnDestroy() {
        this.growlService.hide();
    }
}
