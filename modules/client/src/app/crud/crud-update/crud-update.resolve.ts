import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crud-resolve';
import { CrudService } from '../crud.service';
import { Observable } from 'rxjs';
import { GridOptions } from "ag-grid";

@Injectable()
export class CrudUpdateResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let gridOptions: GridOptions = <GridOptions>{};
        let id = route.params['id'];

        return Observable.create((observer) => {
            this.crudService.getColumnDefs()
                .subscribe(columnDefs => {
                    gridOptions.columnDefs = columnDefs;

                    this.crudService.getRowData()
                        .subscribe(rowData => {
                            gridOptions.rowData = rowData.filter((row) => {
                                if (row['id'] === id) {
                                    return row;
                                }
                            });

                            observer.next(gridOptions);
                            observer.complete();
                        });
                });
        });
    }

}
