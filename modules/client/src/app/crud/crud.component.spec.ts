import { inject, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { HttpModule } from '@angular/http';

describe('CrudComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CrudComponent
            ],
            imports: [
                HttpModule
            ]
        });
    });
});
