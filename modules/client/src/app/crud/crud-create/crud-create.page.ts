import { EC } from "../../common/test/integration/expected-conditions";

export class CrudCreatePage {
    readonly timeout: number = 500;

    crudViewTag = element(by.tagName('crud-view'));
    crudCreateTag = element(by.tagName('crud-create'));
    createButton = element(by.id('createButton'));
    createRecordButton = element(by.id('crud.create'));
    infoMessage = element(by.className('ui-growl'));
    backButton = element(by.id('backButton'));
    inputFields = [
        { element: element(by.id('email')), data: 'ylain' },
        { element: element(by.id('telephoneNumber')), data: '380434975498' },
        { element: element(by.id('password')), data: 'qweF' },
        { element: element(by.id('confirmPassword')), data: 'qweF' },
    ];

    constructor() {
    }

    get() {
        browser.get('admin/user');
    }

    fillInputFields() {
        this.inputFields.forEach(field => {
            browser.wait(EC.elementToBeClickable(field.element), this.timeout);
            field.element.sendKeys(field.data);
        });
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

    clickOnCreateRecordButton() {
        browser.wait(EC.elementToBeClickable(this.createRecordButton), this.timeout);
        this.createRecordButton.click();
    }

    clickOnBackButton() {
        browser.wait(EC.elementToBeClickable(this.backButton), this.timeout);
        this.backButton.click();
    }

}
