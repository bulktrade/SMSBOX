import { Component } from "@angular/core";
import { MessageService } from "../message.service";
import { MessageModel } from "../message.model";

@Component({
    selector: 'iobox',
    template: require('./iobox.component.html'),
    styles: [
        require('./iobox.component.scss')
    ]
})

export class IOBoxComponent {
    messages: MessageModel[] = [];

    constructor(private messageService: MessageService) {

    }

    ngOnInit() {
        this.messageService.getMessages()
            .subscribe((messages: MessageModel[]) => {
                this.messages = this.messageService.sortMessagesByDate(messages);
            });
    }
}