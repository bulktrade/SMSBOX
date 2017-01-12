import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { FeathersService } from "../../services/feathers.service";
import { CrudResolve } from "./common/crud-resolve";
import { CrudService } from "./crud.service";

@Injectable()
export class CrudMainResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.crudService.setFeathersServiceName(route.parent.data['feathersService']);
        this.crudService.setColumnDefinitions(route.parent.data['columnsDefinitions']);

        return undefined;
    }

}
