import { Injectable } from "@angular/core";
import { TokenService } from "./auth/token.service";

let jwtDecode = require('jwt-decode');

@Injectable()
export class CommonService {
    constructor(private tokenService: TokenService) {
    }

    getIDCurrentUser(): string {
        return jwtDecode(this.tokenService.getToken()).id;
    }
}
