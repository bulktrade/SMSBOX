import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { ColDef, GridOptions } from "ag-grid";
import { TranslateService } from "ng2-translate";
import { Router } from "@angular/router";

@Injectable()
export class CrudService {
    public gridOptions: GridOptions;

    constructor(private http: Http,
                private translate: TranslateService,
                private router: Router) {
    }

    getColumnDefs(): Observable<ColDef[]> {
        return Observable.create((observer) => {

            this.http.get('users-list.json')
                .subscribe((res: Response) => {
                    observer.next(res.json()['columnDefs']);
                    observer.complete();
                })

        });
    }

    getRowData(): Observable<Object[]> {
        return Observable.create((observer) => {

            this.http.get('users-list.json')
                .subscribe((res: Response) => {
                    observer.next(res.json()['rowData']);
                    observer.complete();
                })

        });
    }

    setGridOptions(value) {
        this.gridOptions = value;
    }

    getGridOptions(): GridOptions {
        return this.gridOptions;
    }
}
