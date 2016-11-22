import { CrudPage } from "./crud.page";
import { CrudCreatePage } from "./crud-create.page";

describe('Crud create', () => {
    let crudCreatePage = new CrudCreatePage();

    it('should have a <crud-view>', () => {
        crudCreatePage.get();
        expect(crudCreatePage.isPresentCrudViewTag()).toBeTruthy();
    });

    it('should have a <crud-create>', () => {
        crudCreatePage.clickOnCreateButton();
        expect(crudCreatePage.isPresentCrudCreateTag()).toBeTruthy();
    });

    it('should create a new user', () => {
        crudCreatePage.fillInputFields();
        crudCreatePage.clickOnCreateButton();
        expect(crudCreatePage.isPresentInfoMessage()).toBeTruthy();
    });

    it('should have a <crud-view>', () => {
        crudCreatePage.clickOnBackButton();
        expect(crudCreatePage.isPresentCrudViewTag()).toBeTruthy();
    });
});
