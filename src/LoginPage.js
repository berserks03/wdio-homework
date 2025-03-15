export class LoginPage {
    constructor(browser) {
        this.browser = browser;
    }

    async open() {
        await this.browser.url('https://www.saucedemo.com/');
    }

    async enterUsername(username) {
        await this.browser.$('#user-name').setValue(username);
    }

    async enterPassword(password) {
        await this.browser.$('#password').setValue(password);
    }

    async clickLogin() {
        await this.browser.$('#login-button').click();
    }

    async getErrorMessage() {
        return await this.browser.$('//h3[@data-test="error"]').getText();
    }

    async getPageTitle() {
        return await this.browser.getTitle();
    }
}
