import { UserSettingsPage } from "./user-settings.page";

describe('User settings', () => {
    let us = new UserSettingsPage();

    it('should have a <settings>', () => {
        us.get();
        expect(us.isPresentSettings()).toBeTruthy();
    });

    it('should fill input fields', () => {
        us.fillInputFields();
        us.getFirstName()
            .then(val => {
                let result = 'Karl';
                expect(val).toEqual(result);
            })
    });

    it('should show a success message', () => {
        us.clickOnUpdateProfileButton();
        expect(us.isPresentAlert()).toBeTruthy();
    });

    it('should show an error message', () => {
        us.sendKeysToConfirmPassword('fsafJer23');
        expect(us.isPresentHint()).toBeTruthy();
    });
});
