import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { GridOptions } from "ag-grid";
import { CrudViewService } from "./crud-view.service";
import { Pagination } from "../model/pagination";
import { FeathersService } from "../../services/feathers.service";
import { GrowlService } from "../../services/growl/growl.service";

@Component({
    selector: 'crud-view',
    templateUrl: './crud-view.component.html',
    styleUrls: [
        './crud-view.component.scss'
    ],
    providers: [CrudViewService],
})

export class CrudViewComponent {
    public pagination = new Pagination(0, 10, null, null);
    public rowsPerPageOptions: number[] = [10, 20, 30];
    public gridOptions: GridOptions;
    public isDisabledDeleteButton: boolean = true;

    constructor(public translate: TranslateService,
                public router: Router,
                public route: ActivatedRoute,
                public crudViewService: CrudViewService,
                public crudService: CrudService,
                public growlService: GrowlService,
                public feathersService: FeathersService) {
        this.gridOptions = this.getGridOptions();
        this.gridOptions.rowData = this.getRowData();
        this.gridOptions.columnDefs = this.getColumnDefs();
        // cut the column with a password
        this.gridOptions.columnDefs = this.crudService.hideColumnDefs(
            this.gridOptions.columnDefs, ['password']
        );
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

                this.crudViewService.renderPagination(this.pagination.skip, this.pagination.limit)
                    .subscribe((paginate: Pagination) => {
                        this.pagination = paginate;
                        this.gridOptions.api.setRowData(paginate.data);
                    });
            },
            onRowClicked: (event) => {
                this.crudViewService.setCurrentSelectedRow(event.data);
            },
            onCellValueChanged: (event) => {
                this.feathersService.update(event.data.id, event.data, this.crudService.getFeathersServiceName())
                    .subscribe(data => {
                        this.growlService.show({ severity: 'success', detail: 'crud.successUpdate' });
                    }, err => {
                        console.error(err);
                        this.growlService.show({ severity: 'error', detail: 'crud.errorUpdate' });
                    });
            }
        };
    }

    onPaginate(event) {
        this.crudViewService.renderPagination(event.first, event.rows + event.first)
            .subscribe((paginate: Pagination) => {
                this.pagination = paginate;
                this.gridOptions.api.setRowData(paginate.data);
            });
    }

    private getRowData() {
        return this.route.snapshot.data['view'].rowData;
    }

    onFilterChanged(value, gridOptions) {
        gridOptions.api.setQuickFilter(value);
    }

    navigateToDelete() {
        let allID: string[] = [];

        this.gridOptions.api.getSelectedRows().forEach(i => {
           allID.push(i.id);
        });

        this.router.navigate([this.router.url, 'delete', allID.join(' ')]);
    }

    navigateToCreate() {
        this.router.navigate([this.router.url, 'create', this.crudService.getFeathersServiceName()]);
    }
}
