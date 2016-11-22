import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { MessageModel } from "./message.model";
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
    constructor(private http: Http) {
    }

    getMessages(): Observable<MessageModel[]> {
        return Observable.create((observer) => {

            this.http.get('messages.json')
                .subscribe((res: Response) => {
                    observer.next(res.json()['messages']);
                    observer.complete();
                })

        });
    }

    sortMessagesByDate(messages: MessageModel[]): MessageModel[] {
        return messages.sort((a: MessageModel, b: MessageModel) => {
            if (new Date(a.date) > new Date(b.date)) {
                return 1;
            }
            if (new Date(a.date) < new Date(b.date)) {
                return -1;
            }

            return 0;
        })
    }
}