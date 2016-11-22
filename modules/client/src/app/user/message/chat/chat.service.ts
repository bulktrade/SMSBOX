import { Injectable } from "@angular/core";
import { MessageModel } from "../message.model";

@Injectable()
export class ChatService {
    messages: MessageModel[] = [];

    constructor() {
    }

    selectMessageByTelephoneNumber(messages: MessageModel[], telephoneNumber: string): MessageModel[] {
        messages.forEach((i) => {
            if (i.telephoneNumber === telephoneNumber) {
                this.messages.push(i);
            }
        });

        return this.messages;
    }
}