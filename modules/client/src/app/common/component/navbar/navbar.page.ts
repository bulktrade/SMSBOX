import { EC } from "../../test/integration/expected-conditions";

export class NavbarPage {
    readonly timeout: number = 5000;

    logoutButton = element(by.className('logout-button'));
    loginTag = element(by.tagName('login'));

    get() {
        browser.get('/admin');
    }

    isPresentLogoutButton() {
        browser.wait(EC.presenceOf(this.logoutButton), this.timeout);
        return this.logoutButton.isPresent();
    }

    isPresentLoginTag() {
        browser.wait(EC.presenceOf(this.loginTag), this.timeout);
        return this.loginTag.isPresent();
    }

    clickOnLogoutButton() {
        browser.wait(EC.elementToBeClickable(this.logoutButton), this.timeout);
        this.logoutButton.click();
    }
}
