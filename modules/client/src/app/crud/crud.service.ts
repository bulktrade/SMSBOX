import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { ColDef } from "ag-grid";
import { TranslateService } from "ng2-translate";
import { FeathersService } from "../services/feathers.service";
import * as clone from "js.clone";
import { ColFormDefs } from "./model/column/column-form";

@Injectable()
export class CrudService {
    feathersServiceName: string = null;
    columnDefinitions;

    constructor(private translate: TranslateService,
                private feathersService: FeathersService) {
    }

    getColumnGridDefs(): Observable<ColDef[]> {
        return Observable.create((observer) => {

            this.translateColumns(this.getColumnDefinitions().colGridDefs)
                .subscribe((columns: ColDef[]) => {
                    observer.next(columns);
                    observer.complete();
                });

        });
    }

    getColumnFormDefs(): Observable<ColDef[]> {
        return Observable.create((observer) => {

            this.translateColumns(this.getColumnDefinitions().colFormDefs)
                .subscribe((columns: ColFormDefs[]) => {
                    observer.next(columns);
                    observer.complete();
                });

        });
    }

    getRowData(serviceName: string): Observable<Object[]> {
        return Observable.create((observer) => {

            this.feathersService.find(serviceName)
                .subscribe((data: Response) => {
                    observer.next(data.json().data);
                    observer.complete();
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    translateColumns(columns): Observable<ColDef[]> {
        let colDefs = clone(columns);
        let store = [];

        colDefs.forEach(i => {
            store.push(Observable.create((observer) => {

                this.translate.get(i.headerName)
                    .subscribe(columnsName => {
                        i.headerName = columnsName;

                        observer.next(true);
                        observer.complete();
                    });

            }));
        });

        return Observable.forkJoin(store)
            .map(columns => colDefs);
    }

    getFeathersServiceName(): string {
        return this.feathersServiceName;
    }

    setFeathersServiceName(value: string) {
        this.feathersServiceName = value;
    }

    getColumnDefinitions() {
        return this.columnDefinitions;
    }

    setColumnDefinitions(value) {
        this.columnDefinitions = value;
    }
}
