import { EC } from "../../../test/integration/expected-conditions";

export class MenubarPage {
    dashboardNavItem = element(by.css('.ui-menubar-root-list > li:nth-of-type(2) .ui-menuitem-text'));

    readonly timeout: number = 5000;

    get() {
        browser.get('/admin');
    }

    getTextDashboardNavItem() {
        browser.wait(EC.presenceOf(this.dashboardNavItem), this.timeout);
        return this.dashboardNavItem.getText();
    }
}
