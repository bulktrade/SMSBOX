import { MenubarPage } from "./menubar.page";
import { LanguagePage } from "../../language-selector/language-selector.page";

describe('Menubar', () => {
    let menubar: MenubarPage = new MenubarPage();
    let lp: LanguagePage = new LanguagePage();

    it('should translate navigation items to russian language', () => {
        menubar.get();
        lp.clickOnDropdownText();
        lp.clickOnRussianLanguageItem();
        menubar.getTextDashboardNavItem()
            .then(text => {
                let result: string = 'Приборная панель';

                expect(text).toEqual(result);
            });
    });

    it('should translate navigation items to english language', () => {
        lp.clickOnDropdownText();
        lp.clickOnEnglishLanguageItem();

        menubar.getTextDashboardNavItem()
            .then(text => {
                let result: string = 'Dashboard';

                expect(text).toEqual(result);
            });
    });
});
