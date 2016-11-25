import { EC } from "../common/test/integration/expected-conditions";

export class SMSBoxPage {
    timeout: number = 5000;

    smsboxTag = element(by.tagName('smsbox'));
    updateProfileButton = element(by.className('updateProfile'));
    phoneNumberField = element(by.id('phoneNumber'));
    messageBodyField = element(by.id('body'));
    phoneNumberHint = element(by.className('phone-number-hint'));

    get() {
        browser.get('/');
    }

    isPresentSMSBoxTag() {
        browser.wait(EC.presenceOf(this.smsboxTag), this.timeout);
        return this.smsboxTag.isPresent();
    }

    isPresentPhoneNumberHint() {
        browser.wait(EC.presenceOf(this.phoneNumberHint), this.timeout);
        return this.phoneNumberHint.isPresent();
    }

    isEnabledUpdateProfileButton() {
        browser.wait(EC.presenceOf(this.updateProfileButton), this.timeout);
        return this.updateProfileButton.isEnabled();
    }

    sendKeysToPhoneNumberField(value: string) {
        browser.wait(EC.elementToBeClickable(this.phoneNumberField), this.timeout);
        this.phoneNumberField.clear();
        this.phoneNumberField.sendKeys(value);
    }

    sendKeysToMessageBodyField(value: string) {
        browser.wait(EC.elementToBeClickable(this.messageBodyField), this.timeout);
        this.messageBodyField.clear();
        this.messageBodyField.sendKeys(value);
    }
}
