import { Component } from "@angular/core";

@Component({
    selector: 'message',
    template: `
        <div class="main-wrap">
            <breadcrumb></breadcrumb>
            <router-outlet></router-outlet>
        </div>
    `,
    styles: []
})

export class MessageComponent {
    constructor() {

    }
}