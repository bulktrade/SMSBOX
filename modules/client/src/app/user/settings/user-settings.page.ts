import { EC } from "../../common/test/integration/expected-conditions";

export class UserSettingsPage {
    timeout: number = 500;

    settingsTag = element(by.tagName('settings'));
    hint = element(by.className('hint'));
    updateProfileButton = element(by.id('updateProfile'));
    alert = element(by.className('ui-growl'));
    firstNameField = element(by.id('firstName'));
    passwordField = element(by.id('password'));
    confirmPasswordField = element(by.id('confirmPassword'));

    get() {
        browser.get('/user/settings');
    }

    fillInputFields() {
        this.sendKeysToFirstName('Karl');
        this.sendKeysToPassword('admin');
        this.sendKeysToConfirmPassword('admin');
    }

    getFirstName() {
        return this.firstNameField.getAttribute('value');
    }

    clickOnUpdateProfileButton() {
        browser.wait(EC.elementToBeClickable(this.updateProfileButton), this.timeout);
        this.updateProfileButton.click();
    }

    sendKeysToConfirmPassword(value) {
        browser.wait(EC.elementToBeClickable(this.confirmPasswordField), this.timeout);
        this.confirmPasswordField.clear();
        this.confirmPasswordField.sendKeys(value);
    }

    sendKeysToFirstName(value) {
        browser.wait(EC.elementToBeClickable(this.firstNameField), this.timeout);
        this.firstNameField.clear();
        this.firstNameField.sendKeys(value);
    }

    sendKeysToPassword(value) {
        browser.wait(EC.elementToBeClickable(this.passwordField), this.timeout);
        this.passwordField.clear();
        this.passwordField.sendKeys(value);
    }

    isPresentHint() {
        browser.wait(EC.presenceOf(this.hint), this.timeout);
        return this.hint.isPresent();
    }

    isPresentAlert() {
        browser.wait(EC.presenceOf(this.alert), this.timeout);
        return this.alert.isPresent();
    }

    isPresentSettings() {
        browser.wait(EC.presenceOf(this.settingsTag), this.timeout);
        return this.settingsTag.isPresent();
    }
}
