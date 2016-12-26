import { EC } from "../../test/integration/expected-conditions";

export class LanguagePage {
    dropdownText = element(by.className('dropdown-text'));
    languageSelectorTag = element(by.tagName('language-selector'));
    russianLanguageItem = element(by.className('flag-icon-ru'));
    englishLanguageItem = element(by.className('flag-icon-us'));
    sendMessageButton = element(by.className('sendMessage'));

    readonly timeout: number = 5000;

    get() {
        browser.get('/');
    }

    clickOnDropdownText() {
        browser.wait(EC.elementToBeClickable(this.dropdownText), this.timeout);
        this.dropdownText.click();
    }

    clickOnRussianLanguageItem() {
        browser.wait(EC.elementToBeClickable(this.russianLanguageItem), this.timeout);
        this.russianLanguageItem.click();
    }

    clickOnEnglishLanguageItem() {
        browser.wait(EC.elementToBeClickable(this.englishLanguageItem), this.timeout);
        this.englishLanguageItem.click();
    }

    getButtonText() {
        browser.wait(EC.presenceOf(this.sendMessageButton), this.timeout);
        return this.sendMessageButton.getText();
    }

    isPresentLanguageSelectorTag() {
        browser.wait(EC.presenceOf(this.languageSelectorTag), this.timeout);
        return this.languageSelectorTag.isPresent();
    }
}
