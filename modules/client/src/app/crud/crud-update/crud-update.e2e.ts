import { CrudPage } from "./crud.page";
import { CrudUpdatePage } from "./crud-update.page";

describe('Crud update', () => {
    let crudUpdatePage = new CrudUpdatePage();

    it('should have a <crud-view>', () => {
        crudUpdatePage.get();
        expect(crudUpdatePage.isPresentCrudViewTag()).toBeTruthy();
    });

    it('should have a <crud-update>', () => {
        crudUpdatePage.clickOnUpdateIcon();
        expect(crudUpdatePage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('should update a first record', () => {
        crudUpdatePage.updateNameInputFields();
        crudUpdatePage.clickOnUpdatebutton();
        expect(crudUpdatePage.isPresentInfoMessage()).toBeTruthy();
    });
});
