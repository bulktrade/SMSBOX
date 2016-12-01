import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crud-resolve";
import { CrudService } from "../crud.service";
import { Observable } from "rxjs";
import { GridOptions } from "ag-grid";
import { FeathersService } from "../../services/feathers.service";
import { Response } from "@angular/http";

@Injectable()
export class CrudUpdateResolve extends CrudResolve {

    constructor(private crudService: CrudService,
                private feathersService: FeathersService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let gridOptions: GridOptions = <GridOptions>{};
        let id = route.params['id'];

        return Observable.create((observer) => {
            this.crudService.getColumnDefs()
                .subscribe(columnDefs => {
                    gridOptions.columnDefs = columnDefs;

                    this.feathersService.get(id, 'users')
                        .subscribe((res: Response) => {
                            gridOptions.rowData = [res.json()];

                            observer.next(gridOptions);
                            observer.complete();
                        });
                });
        });
    }

}
