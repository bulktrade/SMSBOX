import { AppPage } from "./app.page";

describe('App', () => {
    let appPage = new AppPage();

    beforeEach(() => {
        appPage.get();
    });

    it('should have a title', () => {
        let result = 'SMSBox';
        expect(appPage.getTitle()).toEqual(result);
    });
});