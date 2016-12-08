import { EC } from "../../common/test/integration/expected-conditions";

export class CrudUpdatePage {
    timeout: number = 500;

    crudViewTag = element(by.tagName('crud-view'));
    crudCreateTag = element(by.tagName('crud-update'));
    updateButton = element(by.id('crud.update'));
    updateIcon = element(by.css('.ag-body-container > div:first-of-type .mode_edit-icon'));
    infoMessage = element(by.className('ui-growl'));
    backButton = element(by.id('backButton'));
    firstField = element(by.id('firstName'));

    constructor() {
    }

    get() {
        browser.get('admin/user');
    }

    updateNameInputFields() {
        browser.wait(EC.elementToBeClickable(this.firstField), this.timeout);
        this.firstField.clear();
        this.firstField.sendKeys('Harry');
    }

    isPresentCrudViewTag() {
        browser.wait(EC.presenceOf(this.crudViewTag), this.timeout);
        return this.crudViewTag.isPresent();
    }

    isPresentCrudCreateTag() {
        browser.wait(EC.presenceOf(this.crudCreateTag), this.timeout);
        return this.crudCreateTag.isPresent();
    }

    isPresentInfoMessage() {
        browser.wait(EC.presenceOf(this.infoMessage), this.timeout);
        return this.infoMessage.isPresent();
    }

    clickOnUpdateIcon() {
        browser.wait(EC.elementToBeClickable(this.updateIcon), this.timeout);
        this.updateIcon.click();
    }

    clickOnUpdateButton() {
        browser.wait(EC.elementToBeClickable(this.updateButton), this.timeout);
        this.updateButton.click();
    }

    clickOnBackButton() {
        browser.sleep(5000);
        browser.wait(EC.elementToBeClickable(this.backButton), this.timeout);
        this.backButton.click();
    }

}
