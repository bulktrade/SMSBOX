import { inject, TestBed } from '@angular/core/testing';
import { CrudViewComponent } from './crud-view.component';
import { HttpModule } from '@angular/http';

describe('CrudComponent View', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CrudViewComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });
});
