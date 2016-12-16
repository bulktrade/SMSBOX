import { EC } from "../common/test/integration/expected-conditions";

export class CrudPage {
    timeout: number = 500;

    crudTag = element(by.tagName('crud'));

    get() {
        browser.get('admin/user');
    }

    isPresentCrudTag() {
        browser.wait(EC.presenceOf(this.crudTag), this.timeout);
        return this.crudTag.isPresent();
    }
}
