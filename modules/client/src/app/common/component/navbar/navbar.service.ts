import { Injectable } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { MenuItem } from "primeng/components/common/api";
import { Observable } from "rxjs";

@Injectable()
export class NavbarService {

    constructor(private translateService: TranslateService) {
    }

    /**
     * Translate items in navigation bar
     * @param items
     * @returns {any}
     */
    translateItems(items: MenuItem[]): Observable<MenuItem[]> {
        let observStore = [],
            result: MenuItem[] = items;

        result.forEach(item => {
            this.findAndTranslateAllLabels(item, observStore);
        });

        return Observable.create(obs => {
            Observable.forkJoin(observStore)
                .subscribe(() => {
                    obs.next(result);
                    obs.complete();
                });
        });
    }

    /**
     * Find and translate all labels for each items and subitems
     * @param item
     * @param store
     */
    findAndTranslateAllLabels(item, store?) {
        for (let property in item) {
            if (item.hasOwnProperty(property)) {
                if (typeof item[property] == "object") {
                    this.findAndTranslateAllLabels(item[property]);
                } else if (property === 'label') {
                    store.push(Observable.create((obs) => {
                        this.translateService.get(item[property])
                            .subscribe(translateItem => {
                                item[property] = translateItem;

                                obs.next(item[property]);
                                obs.complete();
                            });
                    }));
                }
            }
        }
    }

}
