import { EC } from "../../common/test/integration/expected-conditions";
export class MessagePage {
    timeout: number = 5000;

    messageTag = element(by.tagName('message'));
    ioboxTag = element(by.tagName('iobox'));
    chatTag = element(by.tagName('chat'));
    userIcon = element(by.className('user-icon'));
    backButton = element(by.className('back-icon'));
    firstMessage = element.all(by.className('list-group-item')).get(1);

    get() {
        browser.get('/user/message');
    }

    clickOnFirstMessage() {
        browser.wait(EC.elementToBeClickable(this.firstMessage), this.timeout);
        this.firstMessage.click();
    }

    clickOnBackButton() {
        browser.wait(EC.elementToBeClickable(this.backButton), this.timeout);
        this.backButton.click();
    }

    isPresentMessage() {
        browser.wait(EC.presenceOf(this.messageTag), this.timeout);
        return this.messageTag.isPresent();
    }

    isPresentChatTag() {
        browser.wait(EC.presenceOf(this.chatTag), this.timeout);
        return this.chatTag.isPresent();
    }

    isPresentIoboxTag() {
        browser.wait(EC.presenceOf(this.ioboxTag), this.timeout);
        return this.ioboxTag.isPresent();
    }

    isPresentUserIcon() {
        browser.wait(EC.presenceOf(this.userIcon), this.timeout);
        return this.userIcon.isPresent();
    }
}
