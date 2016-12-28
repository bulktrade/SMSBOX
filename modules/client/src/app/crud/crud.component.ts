import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from "@angular/router";
import { CrudService } from "./crud.service";

@Component({
    selector: 'crud',
    templateUrl: './crud.component.html',
    styleUrls: [
        './crud.scss'
    ],
    providers: []
})

export class CrudComponent {

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                private crudService: CrudService) {
    }

    ngOnInit() {
        this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd || event instanceof NavigationStart) {
                    this.route.parent.data
                        .subscribe(data => {
                            this.crudService.setFeathersServiceName(data['feathersService']);
                        });
                }
            });
    }

}
