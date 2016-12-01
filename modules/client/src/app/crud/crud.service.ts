import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { ColDef, GridOptions } from "ag-grid";
import { TranslateService } from "ng2-translate";
import { Router } from "@angular/router";
import { FeathersService } from "../services/feathers.service";

@Injectable()
export class CrudService {
    public gridOptions: GridOptions;

    constructor(private translate: TranslateService,
                private router: Router,
                private feathersService: FeathersService) {
    }

    getColumnDefs(): Observable<ColDef[]> {
        return Observable.create((observer) => {

            this.getRowData()
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

    translateColumns(columns): Observable<ColDef[]> {
        let colDefs: ColDef[] = [];

        return Observable.create((observer) => {

            this.translate.get(columns)
                .subscribe(columnsName => {
                    for (let columnName in columnsName) {
                        if (columnsName.hasOwnProperty(columnName)) {
                            colDefs.push(<ColDef>{
                                headerName: columnsName[columnName],
                                field: columnName
                            });
                        }
                    }

                    observer.next(colDefs);
                    observer.complete();
                });

        });
    }

    getRowData(): Observable<Object[]> {
        return Observable.create((observer) => {

            this.feathersService.find('users')
                .subscribe((data: Response) => {
                    observer.next(data.json().data);
                    observer.complete();
                }, err => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    setGridOptions(value) {
        this.gridOptions = value;
    }

    getGridOptions(): GridOptions {
        return this.gridOptions;
    }
}
