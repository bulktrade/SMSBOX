import { TestBed, inject } from '@angular/core/testing';
import { MessageService } from "./message.service";
import { HttpModule, ResponseOptions, Response } from "@angular/http";
import { HTTP_PROVIDERS } from "../../common/test/unit/mock/http-providers";
import { MockBackend } from "@angular/http/testing";
import { MessageModel } from "./message.model";

describe('Message service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MessageService,
                HTTP_PROVIDERS
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should get messages',
        inject([MessageService, MockBackend], (messageService: MessageService, backend: MockBackend) => {
            let messages = {
                "messages": [
                    {
                        "telephoneNumber": "+380983417360",
                        "messageText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                        "date": "Oct 15",
                        "state": "received"
                    },
                    {
                        "telephoneNumber": "+380983417360",
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
                {
                    "telephoneNumber": "+380983417360",
                    "messageText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                    "date": "Oct 25",
                    "state": "received"
                },
                {
                    "telephoneNumber": "+380983417360",
                    "messageText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
                    "date": "Oct 15",
                    "state": "outgoing"
                }
            ];

            messages = messageService.sortMessagesByDate(messages);
            expect(new Date(messages[0].date).getDate()).toEqual(15);
        }));

});
