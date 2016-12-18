import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AdminDashboardModel } from "./dashboard.model";
import { Response, Http } from "@angular/http";

@Injectable()
export class DashboardService {

    constructor(private http: Http) { }

    getDashboardBoxes(): Observable<AdminDashboardModel[]> {
        return Observable.create((observer) => {

            this.http.get('dashboard.json')
                .subscribe((res: Response) => {
                    observer.next(res.json());
                    observer.complete();
                })

        });
    }

}