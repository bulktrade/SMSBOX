import { LoginPage } from "./login.page";

describe('Login', () => {
   let lp: LoginPage = new LoginPage();

    it('should have <login>', () => {
        lp.get();
        expect(lp.isPresentLogin()).toBeTruthy();
    });

    it('should login', () => {
        lp.login();
        expect(lp.isPresentAdminTag()).toBeTruthy();
    });
});