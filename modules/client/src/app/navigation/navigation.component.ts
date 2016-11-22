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
    public currentUrl: string = '';
    public showNavigationBar: boolean = false;
    public navigationList: Array<Object> = [];
    private findPath: string = '';
    private currentComponent = null;
    private rootComponent = null;

    constructor(public router: Router,
                public route: ActivatedRoute,
                public growlService: GrowlService) {
        router.events.subscribe(res => {
            this.currentUrl = router.url;

            if (router.url == '/login' || router.url == '/signup') {
                this.hideContentStyle = true;
            } else {
                this.hideContentStyle = false;
            }
        });
    }
}