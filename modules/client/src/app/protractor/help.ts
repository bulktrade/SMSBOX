import {EC} from "../common/test/integration/expected-conditions";

export class ProtractorHelp {
  /**
   * Enter text to input field
   *
   * @param inputName
   * @param text
   */
  public static InputText(inputName, text: string) {
    let el = element(by.name(inputName));
    browser.wait(EC.presenceOf(el), 5000);
    el.clear();
    el.sendKeys(text);
  }
  
  /**
   * Click element by selector
   *
   * @param selector
   */
  public static ClickBySelector(selector: string) {
    let el = element(by.css(selector));
    browser.wait(EC.presenceOf(el), 5000);
    el.click();
  }
}
