import { MessageState } from "./model/message-state";

export class MessageModel {
    constructor(public telephoneNumber: string,
                public messageText: string,
                public date: string,
                public state: string|MessageState) {
    }
}