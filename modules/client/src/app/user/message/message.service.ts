import { Injectable } from "@angular/core";
import { MessageModel } from "./message.model";
import { Observable } from "rxjs";
import { FeathersService } from "../../services/feathers.service";
import { Response } from "@angular/http";

const SERVICE_NAME = 'messages';

@Injectable()
export class MessageService {
    constructor(private feathersService: FeathersService) {
    }

    getMessages(): Observable<MessageModel[]> {
        return Observable.create((observer) => {

            this.feathersService.find(SERVICE_NAME)
                .subscribe((data: Response) => {
                    observer.next(data.json().data);
                    observer.complete();
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    sortMessagesByDate(messages: MessageModel[]): MessageModel[] {
        return messages.sort((a: MessageModel, b: MessageModel) => {
            if (new Date(a.DATE) > new Date(b.DATE)) {
                return 1;
            }
            if (new Date(a.DATE) < new Date(b.DATE)) {
                return -1;
            }

            return 0;
        })
    }
}
