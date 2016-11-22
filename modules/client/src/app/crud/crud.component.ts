import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'crud',
    template: require('./crud.component.html'),
    styles: [
        require('./crud.scss')
    ],
    providers: []
})

export class CrudComponent {

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {

    }

}
