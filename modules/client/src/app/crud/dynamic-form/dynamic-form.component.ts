import {
    Component,
    Input,
    Output,
    EventEmitter,
    NgModule,
    ModuleWithProviders,
    ViewEncapsulation
} from "@angular/core";
import { Location, CommonModule } from "@angular/common";
import { TranslateService, TranslateModule } from "ng2-translate";
import { Button } from "../model/button";
import { FormsModule } from "@angular/forms";
import { MessagesModule } from "primeng/components/messages/messages";
import { EqualValidatorModule } from "../../common/equal-validator.directive";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ColFormDefs } from "../model/column/column-form";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: [
        './dynamic-form.component.scss'
    ],
    providers: [],
})

export class DynamicFormComponent {
    @Input('columnDefs') columnDefs: ColFormDefs[];
    @Input('buttonModel') buttonModel: Button;
    @Input('model') model = {};

    @Output('submit') submit = new EventEmitter();

    constructor(public location: Location,
                public translate: TranslateService) {
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
        EqualValidatorModule,
        DropdownModule
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
