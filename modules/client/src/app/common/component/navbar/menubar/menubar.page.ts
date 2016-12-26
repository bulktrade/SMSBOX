import { EC } from "../../../test/integration/expected-conditions";

export class MenubarPage {
    dropdownText = element(by.className('dropdown-text'));
    russianLanguageItem = element(by.className('flag-icon-ru'));
    englishLanguageItem = element(by.className('flag-icon-us'));
    dashboardNavItem = element(by.css('.ui-menubar-root-list > li:nth-of-type(2) .ui-menuitem-text'));

    readonly timeout: number = 5000;

    get() {
        browser.get('/admin');
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

    getTextDashboardNavItem() {
        browser.wait(EC.presenceOf(this.dashboardNavItem), this.timeout);
        return this.dashboardNavItem.getText();
    }
}
