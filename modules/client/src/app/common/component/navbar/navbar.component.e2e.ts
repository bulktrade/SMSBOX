import { NavbarPage } from "./navbar.page";
import { LoginPage } from "../../../login/login.page";

describe('Navbar component', () => {
    let navbar = new NavbarPage();
    let login = new LoginPage();

    beforeEach(() => {
        navbar.get();
    });

    it('should have a logout button', () => {
        expect(navbar.isPresentLogoutButton()).toBeTruthy();
    });

    it('should log out', () => {
        navbar.clickOnLogoutButton();
        expect(navbar.isPresentLoginTag()).toBeTruthy();
    });

    it('should log in', () => {
        login.login();
        expect(navbar.isPresentLogoutButton()).toBeTruthy();
    });

});
