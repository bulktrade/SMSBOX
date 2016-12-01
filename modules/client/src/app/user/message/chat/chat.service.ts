import { Injectable } from "@angular/core";
import { MessageModel } from "../message.model";
import { FeathersService } from "../../../services/feathers.service";
import { MessageState } from "../model/message-state";
import { TokenService } from "../../../services/auth/token.service";

var jwtDecode = require('jwt-decode');

@Injectable()
export class ChatService {
    messages: MessageModel[] = [];

    constructor(private feathersService: FeathersService,
                private tokenService: TokenService) {
    }

    selectMessageByTelephoneNumber(messages: MessageModel[], telephoneNumber: string): MessageModel[] {
        messages.forEach((i) => {
            if (i.TELEPHONE_NUMBER === telephoneNumber) {
                this.messages.push(i);
            }
        });

        return this.messages;
    }

    initialMessageUntilSend(message: MessageModel) {
        let result = message;

        message.DATE = String(this.getCurrentData());
        message.STATE = MessageState.Outgoing;
        message.USER_ID = jwtDecode(this.tokenService.getToken()).id;

        return result;
    }

    sendMessage(message: MessageModel) {
        this.feathersService.create(message, 'messages').subscribe();
    }

    getCurrentData(): string {
        let currentData = new Date();

        return currentData.getFullYear() + '-' + currentData.getMonth()
            + '-' + currentData.getDay();
    }

}
