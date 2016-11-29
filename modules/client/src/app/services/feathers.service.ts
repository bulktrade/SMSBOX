import { Injectable } from '@angular/core';
import { LoginModel } from "../login/login.model";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class FeathersService {
    private url: string;
    private urlPrefix: string;
    private localEndpoint: string;
    private token: string;

    constructor(private http: Http, url: string) {
        this.url = url;
        this.localEndpoint = 'auth/local';
        this.urlPrefix = this.url + '/';
    }

    authentication(model: LoginModel, localEndpoint?: string) {
        if (typeof localEndpoint === undefined) {
            this.localEndpoint = localEndpoint;
        }

        return Observable.create((observer) => {
            this.http.post(this.urlPrefix + this.localEndpoint, model)
                .subscribe((res: Response) => {
                    this.token = res.json().token;

                    observer.next(res.json());
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }
}