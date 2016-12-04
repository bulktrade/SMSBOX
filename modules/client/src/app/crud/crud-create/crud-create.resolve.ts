import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CrudResolve } from '../common/crud-resolve';
import { CrudService } from '../crud.service';
import { Observable } from 'rxjs';

@Injectable()
export class CrudCreateResolve extends CrudResolve {

    constructor(public crudService: CrudService) {
        super();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer) => {
            this.crudService.getColumnDefs(this.crudService.getFeathersServiceName())
                .subscribe(columnDefs => {

                    observer.next(columnDefs);
                    observer.complete();
                });
        });
    }

}
