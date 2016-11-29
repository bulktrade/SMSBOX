import { inject, TestBed } from '@angular/core/testing';
import {
    HttpModule,
    ResponseOptions,
    Response, Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CRUD_PROVIDERS } from '../../crud/common/crud-providers';
import { AuthService } from './auth.service';
import { LoginModel } from "../../login/login.model";
import { RouterTestingModule } from "@angular/router/testing";
import { HTTP_PROVIDERS } from "../../common/test/unit/mock/http-providers";
import { TokenService } from "./token.service";
import { FeathersService } from "../feathers.service";

describe('Auth service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                HTTP_PROVIDERS,
                TokenService,
                {
                    provide: FeathersService,
                    useFactory: (http: Http) => {
                        return new FeathersService(http, 'http://localhost:3030');
                    },
                    deps: [Http]
                }
            ],
            imports: [
                HttpModule,
                RouterTestingModule
            ]
        });
    });

    it('should to login', inject([MockBackend, AuthService],
        (backend: MockBackend, service: AuthService) => {
            let model = new LoginModel('admin', 'admin');

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: '{"properties": "success"}' });
                c.mockRespond(new Response(response));
            });

            service.login(model)
                .subscribe((res) => {
                    expect(res).toBeDefined();
                });
        }));

    it('should get an error message', inject([MockBackend, AuthService],
        (backend: MockBackend, service: AuthService) => {
            let model = new LoginModel('test', '12t');
            let error: Error = {
                name: 'Error',
                message: 'Bad request'
            };

            backend.connections.subscribe(c => {
                c.mockError(error);
            });

            service.login(model)
                .subscribe((res) => {
                }, err => {
                    expect(err).toBeDefined();
                });
        }));

});

