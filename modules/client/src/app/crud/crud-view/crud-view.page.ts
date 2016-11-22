import { EC } from "../../common/test/integration/expected-conditions";

export class CrudViewPage {
    timeout: number = 500;

    crudViewTag = element(by.tagName('crud-view'));
    agGridTag = element(by.tagName('crud-view'));
    createButton = element(by.id('createButton'));
    deleteButton = element(by.className('delete-button'));

    constructor() {
    }

    get() {
        browser.get('admin/user');
    }

    isPresentCrudViewTag() {
        browser.wait(EC.presenceOf(this.crudViewTag), this.timeout);
        return this.crudViewTag.isPresent();
    }

    isPresentAgGridTagTag() {
        browser.wait(EC.presenceOf(this.agGridTag), this.timeout);
        return this.agGridTag.isPresent();
    }

    getTextCreateButton() {
        browser.wait(EC.presenceOf(this.createButton), this.timeout);
        return this.createButton.getText();
    }

    isDisableDeleteButton() {
        browser.wait(EC.presenceOf(this.deleteButton), this.timeout);
        return this.deleteButton.isDisplayed();
    }

}
