import { LoginPage } from "./login.page";
import { LanguagePage } from "./language-selector.page";

describe('Login', () => {
    let lp: LanguagePage = new LanguagePage();

    it('should have <language-selector>', () => {
        lp.get();
        expect(lp.isPresentLanguageSelectorTag()).toBeTruthy();
    });

    it('should translate to russian language', () => {
        lp.clickOnDropdownText();
        lp.clickOnRussianLanguageItem();

        lp.getButtonText()
            .then(text => {
                let result: string = 'Отправить';

                expect(text).toEqual(result);
            });
    });

    it('should translate to english language', () => {
        lp.clickOnDropdownText();
        lp.clickOnEnglishLanguageItem();

        lp.getButtonText()
            .then(text => {
                let result: string = 'Send';

                expect(text).toEqual(result);
            });
    });
});
