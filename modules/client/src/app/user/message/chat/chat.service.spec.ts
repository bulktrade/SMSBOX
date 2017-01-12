import { TestBed, inject } from '@angular/core/testing';
import { ChatService } from "./chat.service";
import { MessageModel } from "../message.model";
import { FeathersService } from "../../../services/feathers.service";
import { HttpModule, Http } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
import { TokenService } from "../../../services/auth/token.service";
import { CommonService } from "../../../services/common.service";

describe('Chat service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChatService,
                CommonService,
                TokenService,
                {
                    provide: FeathersService,
                    useFactory: (http: Http, tokenService: TokenService) => {
                        return new FeathersService(http, tokenService);
                    },
                    deps: [Http, TokenService]
                }
            ],
            imports: [
                HttpModule,
                RouterTestingModule
            ]
        });
    });

    it('should select messages by telephone number', inject([ChatService], (chatService: ChatService) => {
        let telephoneNumber: string = '+380983417362';
        let messages: MessageModel[] = [
            <MessageModel>{
                "TELEPHONE_NUMBER": "+380983417362",
                "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "DATE": "Oct 15",
                "STATE": "received"
            },
            <MessageModel>{
                "TELEPHONE_NUMBER": "+380983417362",
                "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "DATE": "Dec 15",
                "STATE": "outgoing"
            },
            <MessageModel>{
                "TELEPHONE_NUMBER": "+380983417361",
                "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                "DATE": "Jun 15",
                "STATE": "received"
            }
        ];

        expect(chatService.selectMessageByTelephoneNumber(messages, telephoneNumber).length).toEqual(2);
    }));
});
