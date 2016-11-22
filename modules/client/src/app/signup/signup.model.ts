export class SignupModel {
    constructor(public login: string,
                public email: string,
                public password: string,
                public confirmPassword: string,) {
    }
}