import { Injectable } from '@angular/core';
import { GridOptions, ColDef } from "ag-grid";
import { TranslateService } from "ng2-translate";
import { Router } from "@angular/router";
import { Button } from "../model/button";
import { FeathersService } from "../../services/feathers.service";
import { Observable } from "rxjs";
import { Response } from "@angular/http";
import { Pagination } from "../model/pagination";

@Injectable()
export class CrudViewService {
    public currentSelectedRow;
    public querySelectors = null;

    constructor(public translate: TranslateService,
                public router: Router,
                public feathersService: FeathersService) {
    }

    isSelectedRecord(gridOptions: GridOptions): boolean {
        if (gridOptions.api.getSelectedRows().length) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Renders the button in column.
     *
     * @example
     * let columnDefs = [
     *  { headerName: 'Employee', field: 'employee' }
     * ];
     *
     * btnRenderer(columnDefs, 'Button', 200, 'done', (event) => {
     *  // do something
     * });
     *
     * @param columnDefs
     * @param nameBtn
     * @param width
     * @param iconName
     * @param clickEvent
     */
    buttonRenderer(colDefs: ColDef[], buttons: Array<Button>, columnWidth): ColDef[] {
        let result: ColDef[] = colDefs;

        colDefs.unshift({
            headerName: ' ',
            field: 'controlPanel',
            width: columnWidth,
            cellRenderer: () => {
                let that = this;
                let buttonWrapper = document.createElement('div');
                buttonWrapper.setAttribute('class', 'ag-control-panel');

                buttons.forEach((i) => {
                    let button = document.createElement('i');
                    button.setAttribute('class', 'material-icons ' +
                        i.iconName.toLowerCase() + '-icon');
                    that.translate.get(i.nameButton)
                        .subscribe(title => {
                            button.setAttribute('title', title);
                        });
                    button.innerHTML = i.iconName;
                    button.setAttribute(
                        'style', 'font-size: 18px; color: #009688; cursor: pointer;');
                    button.addEventListener('click', (event) => {
                        if (i.clickEvent) {
                            i.clickEvent(event);
                        }
                    });

                    buttonWrapper.appendChild(button);
                });

                return buttonWrapper;
            }
        });

        return result;
    }

    /**
     * Adds additional columns to grid like RID, checkbox selection, etc
     */
    addColumnDef(gridOptions: GridOptions): ColDef[] {
        let deleteButton: Button = {
            nameButton: 'crud.delete',
            iconName: 'delete',
            clickEvent: () => {
                setTimeout(() => {
                    this.router.navigate([this.router.url, 'delete',
                        this.getCurrentSelectedRow().id]);
                }, 100);
            }
        };

        let editButton: Button = {
            nameButton: 'crud.update',
            iconName: 'mode_edit',
            clickEvent: () => {
                setTimeout(() => {
                    this.router.navigate([this.router.url, 'update',
                        this.getCurrentSelectedRow().id]);
                }, 100);
            }
        };

        // add buttons
        return this.buttonRenderer(gridOptions.columnDefs, [editButton, deleteButton], 50);
    }

    /**
     * Adds checkbox selection to the columnDefs property.
     *
     * @param columnDefs
     * @param gridOptions
     */
    addColumnCheckbox(gridOptions: GridOptions): ColDef[] {
        let result: ColDef[] = gridOptions.columnDefs;

        result.unshift({
            headerName: ' ',
            field: 'checkboxSel',
            width: 25,
            checkboxSelection: true,
            headerCellTemplate: () => {
                let that = this;
                let eCell = document.createElement('span');
                eCell.innerHTML = require('../common/ag-grid/checkbox-select-all.html');

                let clicked = false;

                this.querySelectors = {
                    eCalendar: eCell.querySelector('#select-all'),
                    allSelected: eCell.querySelector('#all-selected'),
                    notSelected: eCell.querySelector('#not-selected'),
                    notAllSelected: eCell.querySelector('#not-all-selected')
                };

                this.querySelectors.eCalendar.addEventListener('click', () => {
                    clicked = !clicked;

                    if (clicked) {
                        that.changeCheckboxState(gridOptions, 'allSelected');
                    } else {
                        that.changeCheckboxState(gridOptions, 'notSelected');
                    }
                });

                return eCell;
            }
        });

        return result;
    }

    /**
     * Called when select the row or click on checkbox and sets the style to checkbox.
     * @param gridOptions
     * @param isSelectCheckbox
     */
    changeCheckboxState(gridOptions, isSelectCheckbox?: string) {
        if (!isSelectCheckbox) {
            if (gridOptions.api.getRenderedNodes().length === gridOptions.api.getSelectedRows().length) {
                isSelectCheckbox = 'allSelected';
            } else if (!gridOptions.api.getSelectedRows().length) {
                isSelectCheckbox = 'notSelected';
            } else {
                isSelectCheckbox = 'notAllSelected';
            }
        }

        switch (isSelectCheckbox) {
            case 'allSelected':
                gridOptions.api.selectAll();

                this.querySelectors.allSelected.setAttribute('style', 'display: inline;');
                this.querySelectors.notSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notAllSelected.setAttribute('style', 'display: none;');
                break;

            case 'notSelected':
                gridOptions.api.deselectAll();

                this.querySelectors.allSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notSelected.setAttribute('style', 'display: inline;');
                this.querySelectors.notAllSelected.setAttribute('style', 'display: none;');
                break;

            case 'notAllSelected':
                this.querySelectors.allSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notSelected.setAttribute('style', 'display: none;');
                this.querySelectors.notAllSelected.setAttribute('style', 'display: inline;');
                break;

            default:
                break;
        }
    }

    /**
     *
     * @param skip
     * @param limit
     * @returns {any}
     */
    renderPagination(skip, limit): Observable<Pagination> {
        return Observable.create((observer) => {
            this.feathersService.pagination(skip, limit, 'users')
                .subscribe((data: Response) => {
                    observer.next(data.json());
                    observer.complete();
                }, (err) => {
                    observer.error(err);
                    observer.complete();
                });

        });
    }

    getCurrentSelectedRow() {
        return this.currentSelectedRow;
    }

    setCurrentSelectedRow(value) {
        this.currentSelectedRow = value;
    }
}
