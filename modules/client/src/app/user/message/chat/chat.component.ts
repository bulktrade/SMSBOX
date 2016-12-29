import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { ChatService } from "./chat.service";
import { MessageModel } from "../message.model";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: [
        './chat.component.scss'
    ],
    providers: [ChatService]
})

export class ChatComponent {
    message: MessageModel = <MessageModel>{};
    messages: MessageModel[] = [];

    constructor(public messageService: MessageService,
                public route: ActivatedRoute,
                public chatService: ChatService,
                public location: Location) {
    }

    ngOnInit() {
        this.message.TELEPHONE_NUMBER = this.route.params['value']['telephoneNumber'];

        this.messageService.getMessages()
            .subscribe((messages: MessageModel[]) => {
                this.messages = this.messageService.sortMessagesByDate(
                    this.chatService.selectMessageByTelephoneNumber(messages, this.message.TELEPHONE_NUMBER)
                );
            });
    }

    onSubmit() {
        this.message = this.chatService.initialMessageUntilSend(this.message);

        this.messages.push(this.message);
        this.chatService.sendMessage(this.message);
    }
}
