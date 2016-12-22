import { SMSBoxPage } from "./smsbox.page";

describe('SMS Box', () => {
    let smsbox = new SMSBoxPage();

    beforeEach(() => {
        smsbox.get();
    });

    it('should have a <smsbox>', () => {
        expect(smsbox.isPresentSMSBoxTag()).toBeTruthy();
    });

    it('should be disabled "Update profile" button', () => {
        expect(smsbox.isEnabledSendMessageButton()).toBeFalsy();
    });

    it('should show error message', () => {
        smsbox.sendKeysToPhoneNumberField('098746235');
        expect(smsbox.isPresentPhoneNumberHint()).toBeTruthy();
    });

    it('should not show error message', () => {
        smsbox.sendKeysToPhoneNumberField('+098746235');
        expect(smsbox.isEnabledSendMessageButton()).toBeTruthy();
    });
});
