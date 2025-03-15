const { remote, Browser } = require('webdriverio');
const { expect } = require('chai');
const { LoginPage } = require('../LoginPage')

describe('SauceDemo Login Tests', function () {
    this.timeout(30000);

    const browsers = ['chrome', 'microsoftedge'];
    const testData = [
        { username: '', password: '', expectedError: 'Username is required' }, // UC-1
        { username: 'test_user', password: '', expectedError: 'Password is required' }, // UC-2
        { username: 'standard_user', password: 'secret_sauce', expectedError: null } // UC-3
    ];

    browsers.forEach(browserName => {
        describe(`Testing on ${browserName}`, function () {
            let browser;
            let loginPage;

            before(async function () {
                browser = await remote({
                    capabilities: { browserName },
                    logLevel: 'info',
                });

                loginPage = new LoginPage(browser);
                await loginPage.open();
            });

            after(async function () {
                await browser.deleteSession();
            });

            testData.forEach(({ username, password, expectedError }) => {
                it(`Login with username: "${username}" and password: "${password}"`, async function () {
                    await loginPage.enterUsername(username);
                    await loginPage.enterPassword(password);
                    await loginPage.clickLogin();

                    if (expectedError) {
                        const errorMessage = await loginPage.getErrorMessage();
                        expect(errorMessage).to.include(expectedError);
                    } else {
                        const title = await loginPage.getPageTitle();
                        expect(title).to.equal('Swag Labs');
                    }
                });
            });
        });
    });
});
