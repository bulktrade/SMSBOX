import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crud-resolve";
import { CrudService } from "../crud.service";
import { Observable } from "rxjs";
import { GridOptions } from "ag-grid";

@Injectable()
export class CrudViewResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let gridOptions: GridOptions = <GridOptions>{};

        return Observable.create((observer) => {
            this.crudService.getColumnGridDefs()
                .subscribe(columnDefs => {
                    gridOptions.columnDefs = columnDefs;

                    this.crudService.getRowData(this.crudService.getFeathersServiceName())
                        .subscribe(rowData => {
                            gridOptions.rowData = rowData;

                            observer.next(gridOptions);
                            observer.complete();
                        }, err => {
                            gridOptions.rowData = [];

                            observer.next(gridOptions);
                            observer.complete();
                        });
                }, err => {
                    gridOptions.columnDefs = [];

                    observer.next(gridOptions);
                    observer.complete();
                });
        });
    }

}
