import { Component } from "@angular/core";

@Component({
    selector: 'message',
    template: `
        <div id="message-window" class="main-content-padding">
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