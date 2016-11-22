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
        us.getValueGarden()
            .then(val => {
                let result = 'field: 0';
                expect(val).toEqual(result);
            })
    });

    it('should show an error message', () => {
        us.setValueConfirmPassword();
        expect(us.isPresentHint()).toBeTruthy();
    });

    it('should show a success message', () => {
        us.clickOnUpdateProfileButton();
        expect(us.isPresentAlert()).toBeTruthy();
    });
});
