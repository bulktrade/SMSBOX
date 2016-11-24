import { AdminDashboardPage } from "./admin-dashboard.page";

describe('Admin dashboard component', () => {
    let dashboard = new AdminDashboardPage();

    beforeEach(() => {
        dashboard.get();
    });

    it('should have a <dashboard>', () => {
        expect(dashboard.isPresentDashboardTag()).toBeTruthy();
    });

    it('should be 6 dashboard boxes', () => {
        dashboard.getNumberDashboardBoxes()
            .then(count => {
                let result: number = 6;
                expect(count).toEqual(result);
            });
    });

    it('third box should have a red background', () => {
        dashboard.getTitleColor()
            .then(color => {
                let result: string = 'rgba(230, 81, 65, 1)';
                expect(color).toEqual(result);
            });
    });
});