import { EC } from "../../common/test/integration/expected-conditions";

export class DashboardPage {
    timeout: number = 5000;

    dashboardTag = element(by.tagName('dashboard'));
    dashboardBoxes = element.all(by.css('#user-dashboard > div'));
    titleOfThirdBox = element(by.css('#user-dashboard > div:nth-of-type(3) .title'));

    get() {
        browser.get('/admin/dashboard');
    }

    isPresentDashboardTag() {
        browser.wait(EC.presenceOf(this.dashboardTag), this.timeout);
        return this.dashboardTag.isPresent();
    }

    getNumberDashboardBoxes() {
        browser.wait(EC.presenceOf(this.dashboardBoxes.get(0)), this.timeout);
        return this.dashboardBoxes.count();
    }

    getTitleColor() {
        browser.wait(EC.presenceOf(this.titleOfThirdBox), this.timeout);
        return this.titleOfThirdBox.getCssValue('color');
    }
}
