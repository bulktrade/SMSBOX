import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { GridOptions } from "ag-grid";
import { CrudViewService } from "./crud-view.service";
import { Pagination } from "../model/pagination";

@Component({
    selector: 'crud-view',
    template: require('./crud-view.component.html'),
    styles: [
        require('./crud-view.component.scss')
    ],
    providers: [CrudViewService],
})

export class CrudViewComponent {
    public pagination = new Pagination(0, 10, [10, 20, 30]);
    private gridOptions: GridOptions;
    private isDisabledDeleteButton: boolean = true;

    constructor(public translate: TranslateService,
                public router: Router,
                public route: ActivatedRoute,
                public crudViewService: CrudViewService,
                public crudService: CrudService) {
        this.gridOptions = this.getGridOptions();
        this.gridOptions.rowData = this.getRowData();
        this.gridOptions.columnDefs = this.getColumnDefs();
        // add buttons in the first column
        this.gridOptions.columnDefs = this.crudViewService.addColumnDef(this.gridOptions);
        this.gridOptions.columnDefs = this.crudViewService.addColumnCheckbox(this.gridOptions);
    }

    private getColumnDefs() {
        return this.route.snapshot.data['view'].columnDefs;
    }

    private getGridOptions(): GridOptions {
        return <GridOptions>{
            rowSelection: 'multiple',
            onRowSelected: () => {
                this.isDisabledDeleteButton =
                    this.crudViewService.isSelectedRecord(this.gridOptions);

                this.crudViewService.changeCheckboxState(this.gridOptions);
            },
            onGridReady: () => {
                this.isDisabledDeleteButton =
                    this.crudViewService.isSelectedRecord(this.gridOptions);

                this.gridOptions.api.setRowData(
                    this.crudViewService.renderPagination(this.pagination.offset,
                        this.pagination.limit, this.gridOptions.rowData)
                )
            },
            onRowClicked: (event) => {
                this.crudViewService.setCurrentSelectedRow(event.data);
            }
        };
    }

    onPaginate(event) {
        this.gridOptions.api.setRowData(
            this.crudViewService.renderPagination(event.first, event.rows + event.first, this.gridOptions.rowData)
        )
    }

    private getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    navigateToDelete() {
        this.router.navigate([this.router.url, 'delete', this.gridOptions.api.getSelectedRows()[0].id]);
    }

    navigateToCreate() {
        this.router.navigate([this.router.url, 'create']);
    }
}
