import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ConfigService} from "../config/config-service";
import { LoginModel } from "./login.model";

@Injectable()
export class LoginService {

    constructor(private configService: ConfigService) {

    }
    //@tod первая страница
    public checkLoginData(loginModel: LoginModel) {
        for (let item of ConfigService.UserData) {
            if (loginModel.username == item['login'] && loginModel.password == item['password']) {
                return  true;
            }
        }

        return false;
    }
}