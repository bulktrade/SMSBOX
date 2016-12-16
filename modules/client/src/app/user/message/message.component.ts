import { Component } from "@angular/core";
import { FeathersService } from "../../services/feathers/feathers.service";

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