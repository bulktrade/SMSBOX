import { EC } from "../../common/test/integration/expected-conditions";

export class UserSettingsPage {
    timeout: number = 500;

    settingsTag = element(by.tagName('settings'));
    hint = element(by.className('hint'));
    updateProfileButton = element(by.className('updateProfile'));
    alert = element(by.tagName('alert'));
    inputFields = [
        element(by.id('gender')),
        element(by.id('firstname')),
        element(by.id('surname')),
        element(by.id('emailAddress')),
        element(by.id('mobilePhoneNumber')),
        element(by.id('password')),
        element(by.id('confirmPassword'))
    ];

    get() {
        browser.get('/user/settings');
    }

    getValueGarden() {
        return this.inputFields[0].getAttribute('value');
    }

    clickOnUpdateProfileButton() {
        browser.wait(EC.elementToBeClickable(this.updateProfileButton), this.timeout);
        this.updateProfileButton.click();
    }

    setValueConfirmPassword() {
        let lastField = this.inputFields[this.inputFields.length - 1];

        browser.wait(EC.elementToBeClickable(lastField), this.timeout);
        lastField.sendKeys('confirm password');
    }

    fillInputFields() {
        for (let i = 0; i < this.inputFields.length; i++) {
            browser.wait(EC.elementToBeClickable(this.inputFields[i]), this.timeout);
            this.inputFields[i].sendKeys('field: ' + i);
        }
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