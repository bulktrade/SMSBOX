import { CrudPage } from "./crud.page";
import { CrudViewPage } from "./crud-view.page";

describe('Crud view', () => {
    let crudViewPage = new CrudViewPage();

    it('should have a <crud-view>', () => {
        crudViewPage.get();
        expect(crudViewPage.isPresentCrudViewTag()).toBeTruthy();
    });

    it('should have a <ag-grid-ng2>', () => {
        expect(crudViewPage.isPresentAgGridTagTag()).toBeTruthy();
    });

    it('create button should have a "Create" name', () => {
        let result = 'Create';

        crudViewPage.getTextCreateButton()
            .then(res => {
                expect(res).toEqual(result);
            });
    });

    it('delete button should be deactivated', () => {
        expect(crudViewPage.isDisableDeleteButton()).toBeTruthy();
    });
});
