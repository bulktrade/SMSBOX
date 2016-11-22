import { inject, TestBed } from '@angular/core/testing';
import { CRUD_PROVIDERS } from './common/crud-providers';
import { HttpModule } from '@angular/http';
import { HTTP_PROVIDERS } from '../common/mock/http-providers';

describe('CrudComponent Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
            ],
            imports: [
                HttpModule
            ]
        });
    });
});
