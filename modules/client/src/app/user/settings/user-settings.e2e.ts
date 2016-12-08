import { UserSettingsPage } from "./user-settings.page";

describe('User settings', () => {
    let us = new UserSettingsPage();

    beforeEach(() => {
        us.get();
    });

    it('should have a <settings>', () => {
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
        us.sendKeysToConfirmPassword('');
        expect(us.isPresentHint()).toBeTruthy();
    });
});
