import { Injectable } from "@angular/core";
import { FeathersService } from "../services/feathers.service";

@Injectable()
export class LoginService {

    constructor(public feathersService: FeathersService) {
    }

    forgotPassword(email: string) {
        return this.feathersService.sendMail(email);
    }
}
