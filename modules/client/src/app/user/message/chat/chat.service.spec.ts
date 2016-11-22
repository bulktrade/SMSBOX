import { TestBed, inject } from '@angular/core/testing';
import { ChatService } from "./chat.service";
import { MessageModel } from "../message.model";

describe('Chat service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChatService]
        });
    });

    it('should select messages by telephone number', inject([ChatService], (chatService: ChatService) => {
        let telephoneNumber: string = '+380983417362';
        let messages: MessageModel[] = [
            {
                "telephoneNumber": "+380983417362",
                "messageText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "date": "Oct 15",
                "state": "received"
            },
            {
                "telephoneNumber": "+380983417362",
                "messageText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "date": "Dec 15",
                "state": "outgoing"
            },
            {
                "telephoneNumber": "+380983417361",
                "messageText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "date": "Jun 15",
                "state": "received"
            }
        ];

        expect(chatService.selectMessageByTelephoneNumber(messages, telephoneNumber).length).toEqual(2);
    }));
});
