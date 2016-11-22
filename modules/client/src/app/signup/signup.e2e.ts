import {AppPage} from "../app.page";
import {ProtractorHelp} from "../protractor/help";

describe('App', () => {
  let appPage = new AppPage();
  
  beforeEach(() => {
    appPage.getPage('/signup');
  });
  
  it('should have a title', () => {
    let result = 'SMSBox';
    expect(appPage.getTitle()).toEqual(result);
  });
  
  it('Enter data', () => {
    ProtractorHelp.InputText('login', 'Masha');
    ProtractorHelp.InputText('email', 'masha@gmail.com');
    ProtractorHelp.InputText('password', 'Masha2000');
    ProtractorHelp.InputText('confirmPassword', 'Masha2000');
  });
  
  it('Click Sign up button', () => {
    ProtractorHelp.ClickBySelector('button[type="submit"]');
  });
});
