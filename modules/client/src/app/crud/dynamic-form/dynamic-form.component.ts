import { Component, Input, Output, EventEmitter, NgModule, ModuleWithProviders } from "@angular/core";
import { Location, CommonModule } from "@angular/common";
import { ColDef } from "ag-grid";
import { TranslateService, TranslateModule } from "ng2-translate";
import { Button } from "../model/button";
import { FormsModule } from "@angular/forms";
import { MessagesModule } from "primeng/components/messages/messages";
import { EqualValidatorModule } from "../../common/equal-validator.directive";

@Component({
    selector: 'dynamic-form',
    template: require('./dynamic-form.component.html'),
    styles: [
        require('./dynamic-form.component.scss')
    ],
    providers: [],
})

export class DynamicFormComponent {
    @Input('columnDefs') columnDefs: ColDef[];
    @Input('buttonModel') buttonModel: Button;
    @Input('model') model = {};

    @Output('submit') submit = new EventEmitter();

    constructor(private location: Location,
                private translate: TranslateService) {
    }

    onSubmit() {
        this.submit.emit(this.model);
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        MessagesModule,
        EqualValidatorModule
    ],
    exports: [DynamicFormComponent],
    declarations: [DynamicFormComponent],
})
export class DynamicFormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicFormModule,
            providers: []
        };
    }
}
