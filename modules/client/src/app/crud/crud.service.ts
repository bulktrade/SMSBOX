import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { ColDef } from "ag-grid";
import { TranslateService } from "ng2-translate";
import { Router } from "@angular/router";
import { FeathersService } from "../services/feathers.service";

@Injectable()
export class CrudService {
    feathersServiceName: string = null;

    constructor(private translate: TranslateService,
                private router: Router,
                private feathersService: FeathersService) {
    }

    getColumnDefs(serviceName: string): Observable<ColDef[]> {
        return Observable.create((observer) => {

            this.getRowData(serviceName)
                .subscribe((data) => {
                    this.translateColumns(Object.keys(data[0]))
                        .subscribe((res: ColDef[]) => {
                            observer.next(res);
                            observer.complete();
                        });
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    hideColumnDefs(columnDefs: ColDef[], hideColumns: string[]): ColDef[] {
        let result: ColDef[] = columnDefs;

        hideColumns.forEach(hideColumn => {
            result.forEach((columnDef, index, object) => {
                if (columnDef.field === hideColumn) {
                    object.splice(index, 1);
                }
            });
        });

        return result;
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
        let colDefs: ColDef[] = [];

        return Observable.create((observer) => {

            this.translate.get(columns)
                .subscribe(columnsName => {
                    for (let columnName in columnsName) {
                        if (columnsName.hasOwnProperty(columnName)) {
                            colDefs.push(<ColDef>{
                                headerName: columnsName[columnName],
                                field: columnName,
                                editable: true
                            });
                        }
                    }

                    observer.next(colDefs);
                    observer.complete();
                });

        });
    }

    getFeathersServiceName(): string {
        return this.feathersServiceName;
    }

    setFeathersServiceName(value: string) {
        this.feathersServiceName = value;
    }
}
