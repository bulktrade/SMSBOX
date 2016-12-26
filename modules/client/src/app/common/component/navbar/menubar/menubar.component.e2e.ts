import { MenubarPage } from "./menubar.page";

describe('Menubar', () => {
    let menubar: MenubarPage = new MenubarPage();

    it('should translate navigation items to russian language', () => {
        menubar.get();
        menubar.clickOnDropdownText();
        menubar.clickOnRussianLanguageItem();
        menubar.getTextDashboardNavItem()
            .then(text => {
                let result: string = 'Приборная панель';

                expect(text).toEqual(result);
            });
    });

    it('should translate navigation items to english language', () => {
        menubar.clickOnDropdownText();
        menubar.clickOnEnglishLanguageItem();

        menubar.getTextDashboardNavItem()
            .then(text => {
                let result: string = 'Dashboard';

                expect(text).toEqual(result);
            });
    });
});
