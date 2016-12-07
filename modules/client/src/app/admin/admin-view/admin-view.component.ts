import {Component} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'admin-view',
    template: require('./admin-view.component.html'),
    styles: [
        require('../../common/content.scss'),
        require('./admin-view.component.scss')
    ]
})

export class AdminViewComponent {
    private form: FormGroup;
    
    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            recipient: '',
            bodyText: ''
        });
    }

    onSubmit() {
    }
}