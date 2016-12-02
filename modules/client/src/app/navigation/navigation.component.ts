import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { GrowlService } from "../services/growl/growl.service";

@Component({
    selector: 'navigation',
    template: require('./navigation.component.html'),
    styles: [
        require('./navigation.component.scss')
    ]
})

export class NavigationComponent {
    public hideContentStyle: boolean = false;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public growlService: GrowlService) {
    }
}
