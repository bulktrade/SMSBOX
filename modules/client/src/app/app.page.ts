export class AppPage {
    get() {
        browser.get('/');
    }

    getTitle() {
        return browser.getTitle();
    }
    
    getPage(url: string) {
      browser.get(url);
    }
}
