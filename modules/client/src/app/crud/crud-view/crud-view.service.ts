import { Injectable } from "@angular/core";
import { GridOptions, ColDef } from "ag-grid";
import { TranslateService } from "ng2-translate";
import { Router } from "@angular/router";
import { Button } from "../model/button";
import { FeathersService } from "../../services/feathers.service";
import { Observable } from "rxjs";
import { Response } from "@angular/http";
import { Pagination } from "../model/pagination";
import { CrudService } from "../crud.service";

@Injectable()
export class CrudViewService {
    public currentSelectedRow;
    public querySelectors = null;

    constructor(public translate: TranslateService,
                public router: Router,
                public crudService: CrudService,
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
                eCell.innerHTML = `
                    <div colid="checkboxSel" tabindex="-1" class="ag-cell-no-focus ag-cell
                        ag-cell-not-inline-editing" style="left: 0; width: 25px;">
                        <span class="ag-cell-wrapper">
                           <span class="ag-selection-checkbox" id="select-all">
                               <img id="all-selected" style="display: none;"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGX
                                    RFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXA
                                    AAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+
                                    IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb
                                    3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZj
                                    pSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnM
                                    jIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5h
                                    ZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhc
                                    C8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veG
                                    FwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3ODM4MTFFNjE
                                    xQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRkJCRDU1MTEyM0Ex
                                    MUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRkJCRDU1MDEyM
                                    0ExMUU2ODE4MUUyOTNBNTRGQkIxNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1
                                    M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWl
                                    kOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAu
                                    ZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uP
                                    iA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+riMaEQAAAL5JREFUeN
                                    qUks0JhDAQhSd7tgtLMDUIyTXF2IdNWIE3c0ruYg9LtgcPzvpEF8SfHR8MGR75hpcwRERmrjQXCyu
                                    tDKUQAkuFu2AUpsyiJ1JK0UtycRgGMsbsPBFYVRVZaw/+7Zu895znOY/j+PPWT7oGp2lirTU3TbPz
                                    /4IAAGLALeic47Ztlx7RELHrusPAAwgoy7LlrOuay7I8TXIadYOLouC+7+XgBiP2lTbw0crFGAF9A
                                    Nq1kS75G8xXgAEAiqu9OeWZ/voAAAAASUVORK5CYII=">
                               <img id="not-selected" style="display: inline;" src="data:image/png;
                                        base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQ
                                        BBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHB
                                        hY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4Onht
                                        cG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlI
                                        DUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZj
                                        pSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXg
                                        tbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6
                                        Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvY
                                        mUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy
                                        5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDp
                                        FQ0VGQkU3ODM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1w
                                        LmRpZDo2MkU1Rjk1NDExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wTU06SW5zdGFuY2VJR
                                        D0ieG1wLmlpZDo2MkU1Rjk1MzExNDExMUU2ODhEQkMyRTJGOUNGODYyQyIgeG1wOkNyZWF0b3
                                        JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJ
                                        vbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1MkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2
                                        Q0YzMUMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDO
                                        ERFRUM2Q0YzMUMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZX
                                        RhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t+CXswAAAFBJREFUeNrsksENwDAIA023a9YGNqlItki
                                        xlAFIn1VOMv5wvACAOxOZWUwsB6Gqswp36QivJNhBRHDhI0f8j9jNrCy4O2twNMobT/7QeQUY
                                        AFaKU1yE2OfhAAAAAElFTkSuQmCC">
                               <img id="not-all-selected" style="display: none;" src="data:image/
                                        png;
                                        base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQB
                                        BZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY
                                        2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1
                                        ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuM
                                        y1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREY
                                        geG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjI
                                        j4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5
                                        hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL
                                        3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5
                                        jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFQ0VGQkU3O
                                        DM4MTFFNjExQjlCQzhERUVDNkNGMzFDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMjU
                                        4MzhGQjEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZ
                                        DpGMjU4MzhGQTEyM0ExMUU2QjAxM0Q2QjZFQ0IzNzM4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9
                                        iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppb
                                        nN0YW5jZUlEPSJ4bXAuaWlkOjIzMkM4M0M1M0MxMUU2MTFCOUJDOERFRUM2Q0YzMUMzIiBzdFJ
                                        lZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVDRUZCRTc4MzgxMUU2MTFCOUJDOERFRUM2Q0YzMUMzI
                                        i8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQ
                                        gZW5kPSJyIj8+2Xml2QAAAGBJREFUeNpiYGBg8ATiZ0D8n0j8DKqH4dnhw4f/EwtAakF6GEGmA
                                        AEDKYCRkZGBiYFMQH+NLNjcjw2ghwMLIQWDx48Do/H5kSNHiNZw9OhREPUCRHiBNJOQyJ+A9AA
                                        EGACqkFldNkPUwwAAAABJRU5ErkJggg==">
                           </span>
                           <span class="ag-cell-value"></span>
                        </span>
                    </div>
                `;

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
            this.feathersService.pagination(skip, limit, this.crudService.getFeathersServiceName())
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
