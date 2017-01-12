import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CrudResolve } from "../common/crud-resolve";
import { CrudService } from "../crud.service";
import { GridOptions } from "ag-grid";
import { Observable } from "rxjs";
import { Response } from "@angular/http";
import { FeathersService } from "../../services/feathers.service";

@Injectable()
export class CrudCreateResolve extends CrudResolve {

    constructor(public crudService: CrudService,
                public feathersService: FeathersService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let gridOptions: GridOptions = <GridOptions>{};
        let id = route.params['id'];

        return Observable.create((observer) => {
            this.crudService.getColumnFormDefs()
                .subscribe(columnDefs => {
                    gridOptions.columnDefs = columnDefs;

                    this.feathersService.get(id, this.crudService.getFeathersServiceName())
                        .subscribe((res: Response) => {
                            gridOptions.rowData = [res.json()];

                            observer.next(gridOptions);
                            observer.complete();
                        });
                });
        });
    }

}
