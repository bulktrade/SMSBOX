import { MessagePage } from "./message.page";

describe('Message', () => {
    let ms: MessagePage = new MessagePage();

    it('should have a <message>', () => {
        ms.get();
        expect(ms.isPresentMessage()).toBeTruthy();
    });

    it('should navigate to chat', () => {
        ms.clickOnFirstMessage();
        expect(ms.isPresentChatTag()).toBeTruthy();
    });

    it('should have a user-icon', () => {
        expect(ms.isPresentUserIcon()).toBeTruthy();
    });

    it('should navigate to iobox', () => {
        ms.clickOnBackButton();
        expect(ms.isPresentIoboxTag()).toBeTruthy();
    });
});
