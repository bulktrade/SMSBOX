import { TestBed, inject } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { HttpModule, ResponseOptions, Response, Http } from "@angular/http";
import { HTTP_PROVIDERS } from "../../common/test/unit/mock/http-providers";
import { MockBackend } from "@angular/http/testing";
import { MessageModel } from "./message.model";
import { TokenService } from "../../services/auth/token.service";
import { FeathersService } from "../../services/feathers.service";
import { RouterTestingModule } from "@angular/router/testing";

describe('Message service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MessageService,
                HTTP_PROVIDERS,
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

    it('should get messages',
        inject([MessageService, MockBackend], (messageService: MessageService, backend: MockBackend) => {
            let messages = {
                data: [
                    {
                        "TELEPHONE_NUMBER": "+380983417362",
                        "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                        "DATE": "Oct 15",
                        "STATE": "received"
                    },

                    {
                        "TELEPHONE_NUMBER": "+380983417362",
                        "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                        "DATE": "Dec 15",
                        "STATE": "outgoing"
                    },
                    {
                        "TELEPHONE_NUMBER": "+380983417361",
                        "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                        "DATE": "Jun 15",
                        "STATE": "received"
                    }
                ]
            };

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: JSON.stringify(messages) });
                c.mockRespond(new Response(response));
            });

            messageService.getMessages()
                .subscribe((res) => {
                    expect(res.length).toEqual(3);
                })

        }));

    it('should sort messages',
        inject([MessageService], (messageService: MessageService) => {
            let messages: MessageModel[] = [
                <MessageModel>{
                    "TELEPHONE_NUMBER": "+380983417360",
                    "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                    "DATE": "Oct 25",
                    "STATE": "received"
                },
                <MessageModel>{
                    "TELEPHONE_NUMBER": "+380983417360",
                    "MESSAGE_TEXT": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                    "DATE": "Oct 15",
                    "STATE": "outgoing"
                }
            ];

            messages = messageService.sortMessagesByDate(messages);
            expect(new Date(messages[0].DATE).getDate()).toEqual(15);
        }));

});
