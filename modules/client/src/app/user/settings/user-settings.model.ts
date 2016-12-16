export class UserSettingsModel {
    constructor(public gender: string,
                public firstName: string,
                public surname: string,
                public emailAddress: string,
                public mobilePhoneNumber: string,
                public password: string,
                public confirmPassword: string) {
    }
}