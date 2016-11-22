import { EC } from "../../common/test/integration/expected-conditions";

export class CrudCreatePage {
    timeout: number = 500;

    crudViewTag = element(by.tagName('crud-view'));
    crudCreateTag = element(by.tagName('crud-create'));
    createButton = element(by.id('createButton'));
    infoMessage = element(by.id('infoMessage'));
    backButton = element(by.id('backButton'));
    inputFields = [
        element(by.id('id')),
        element(by.id('name')),
        element(by.id('mood')),
        element(by.id('number'))
    ];

    constructor() {
    }

    get() {
        browser.get('admin/user');
    }

    fillInputFields() {
        for (let i = 0; i < this.inputFields.length; i++) {
            browser.wait(EC.elementToBeClickable(this.inputFields[i]), this.timeout);
            this.inputFields[i].sendKeys('field: ' + i);
        }
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

    clickOnCreateButton() {
        browser.wait(EC.elementToBeClickable(this.createButton), this.timeout);
        this.createButton.click();
    }

    clickOnBackButton() {
        browser.wait(EC.elementToBeClickable(this.backButton), this.timeout);
        this.backButton.click();
    }

}
