import { EC } from "../common/test/integration/expected-conditions";
import { LoginModel } from "./login.model";

export class LoginPage {
    timeout: number = 5000;

    loginTag = element(by.tagName('login'));
    usernameField = element(by.id('username'));
    passwordField = element(by.id('password'));
    submitButton = element(by.className('submitButton'));
    adminTag = element(by.tagName('admin'));

    get() {
        browser.get('/login');
    }

    login() {
        let model: LoginModel = new LoginModel('admin@smsc.io', 'admin');

        this.setValueToUsernameField(model.email);
        this.setValueToPasswordField(model.password);
        this.clickOnLoginButton();
    }

    isPresentAdminTag() {
        browser.wait(EC.presenceOf(this.adminTag), this.timeout);
        return this.adminTag.isPresent();
    }

    isPresentLogin() {
        browser.wait(EC.presenceOf(this.loginTag), this.timeout);
        return this.loginTag.isPresent();
    }

    setValueToUsernameField(value) {
        browser.wait(EC.elementToBeClickable(this.usernameField), this.timeout);
        this.usernameField.sendKeys(value);
    }

    setValueToPasswordField(value) {
        browser.wait(EC.elementToBeClickable(this.passwordField), this.timeout);
        this.passwordField.sendKeys(value);
    }

    clickOnLoginButton() {
        browser.wait(EC.elementToBeClickable(this.submitButton), this.timeout);
        this.submitButton.click();
    }
}