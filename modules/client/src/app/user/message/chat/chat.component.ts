import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "./chat.service";
import { MessageModel } from "../message.model";

@Component({
    selector: 'chat',
    template: require('./chat.component.html'),
    styles: [
        require('./chat.component.scss')
    ],
    providers: [ChatService]
})

export class ChatComponent {
    telephoneNumber: string = '';
    messages: MessageModel[] = [];

    constructor(private messageService: MessageService,
                private route: ActivatedRoute,
                private chatService: ChatService,
                private location: Location) {
    }

    ngOnInit() {
        this.telephoneNumber = this.route.params['value']['telephoneNumber'];

        this.messageService.getMessages()
            .subscribe((messages: MessageModel[]) => {
                this.messages = this.messageService.sortMessagesByDate(
                    this.chatService.selectMessageByTelephoneNumber(messages, this.telephoneNumber)
                );
            });
    }

    onSubmit() {
    }
}