import { CrudPage } from "./crud.page";

describe('Crud', () => {
    let crudPage = new CrudPage();

    it('should have a <crud>', () => {
        crudPage.get();
        expect(crudPage.isPresentCrudTag()).toBeTruthy();
    });
});
