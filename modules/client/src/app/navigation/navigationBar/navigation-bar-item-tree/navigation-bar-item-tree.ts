import {Component, Input, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'navigation-bar-menu-tree',
    encapsulation: ViewEncapsulation.Emulated,
    template: require('./navigation-bar-item-tree.html'),
    styles: [
        require('./navigation-bar-item-tree.scss')
    ]
})

export class NavigationBarItemTreeComponent {
    @Input() public tree: Array<Object> = [];

    @Input() public customClass: string = '';

    constructor() {

    }
}