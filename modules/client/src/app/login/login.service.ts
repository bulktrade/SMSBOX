import { Injectable } from '@angular/core';
import { URLSearchParams, Headers } from "@angular/http";
import { FeathersService } from "../services/feathers.service";

@Injectable()
export class LoginService {

    constructor(public feathersService: FeathersService) { }

    forgotPassword(email: string) {
    }
}
