import {Component, Output, EventEmitter, NgModule} from "@angular/core";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule} from "ng2-translate";
import {NavigationBarItemTreeComponent} from "./navigation-bar-item-tree/navigation-bar-item-tree";

@Component({
    selector: 'navigation-bar',
    template: require('./navigation-bar.component.html'),
    styles: [
        require('./navigation-bar.component.scss')
    ]
})

export class NavigationBarComponent {
    public currentUrl: string = '';
    public showNavigationBar: boolean = false;
    public navigationList: Array<Object> = [];
    public toggleMenu: boolean = false;
    private findPath: string = '';
    private parentPath: string = '/';
    private rootComponent: Object = null;
    private currentComponent: Object = null;

    @Output() renderNavigationBar: EventEmitter<any> = new EventEmitter();

    constructor(public router: Router,
                public route: ActivatedRoute) {

    }

    ngOnInit() {
        this.router.events.subscribe(res => {
            this.parentPath = '/' + this.route.routeConfig.path;

            if (this.route.routeConfig.children != undefined) {
                this.navigationList = this.getNavigationList(this.route.routeConfig.children, this.parentPath, 1);

                if (this.route.hasOwnProperty('data') && this.route['data'].hasOwnProperty('_value')) {
                    if (this.route['data']['_value'].hasOwnProperty('showNavigationBar')) {
                        this.showNavigationBar = this.route['data']['_value']['showNavigationBar'];

                        this.parentPath = '/' + this.route.parent.routeConfig.path;

                        if (this.route.routeConfig.path == '') {
                            this.currentUrl = this.parentPath
                        } else {
                            this.currentUrl = this.parentPath + '/' + this.route.routeConfig.path;
                        }
                    }
                }
            }
        });
    }

    //  Get navigation list
    getNavigationList(routes: Array<Object>, parentPath: string, deep: number): Array<Object> {
        let paths: Array<Object> = [];

        for (let item of routes) {
            let link;
            let ngClass: Array<string> = [];
            let submenuNgClass: Array<string> = [];

            if (item['path'] == '') {
                continue;
            } else {
                link = parentPath+ '/' +item['path'];
            }

            //  Get childs for item
            let childs: Array<Object> = [];

            if (item.hasOwnProperty('children')) {
                childs = this.getNavigationList(item['children'], link, deep+1);

                submenuNgClass.push('dropdown-menu');
            }

            if (link.length <= this.router.url.length){
                if (this.router.url.indexOf(link) == 0) {
                    ngClass.push('active');
                }
            }

            paths.push({
                name: item['data'].hasOwnProperty('translationKey')
                    ? item['data']['translationKey'] : item['component']['name'],
                link: link,
                ngClass: ngClass.join(' '),
                submenuNgClass: submenuNgClass.join(' '),
                childs: childs
            });
        }

        return paths;
    }
}

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        TranslateModule
    ],
    exports: [
        NavigationBarComponent,
        NavigationBarItemTreeComponent
    ],
    declarations: [
        NavigationBarComponent,
        NavigationBarItemTreeComponent
    ]
})

export class  NavigationBarComponentModule {}