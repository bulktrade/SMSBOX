import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { TokenService } from './token.service';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import { FeathersService } from "../feathers.service";
import { LoginModel } from "../../login/login.model";

@Injectable()
export class AuthService {
    constructor(public tokenService: TokenService,
                private feathersService: FeathersService) {
    }

    login(model: LoginModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return Observable.create((observer) => {
            this.feathersService.authentication(model)
                .subscribe(
                    data => {
                        this.tokenService.setToken(data.json()['token']);
                        observer.next(this.tokenService.getToken());
                        observer.complete();
                    },
                    err => {
                        observer.error(err);
                        observer.complete();
                    });
        });
    }
}
