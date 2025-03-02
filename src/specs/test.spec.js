const { remote } = require('webdriverio');
const { expect } = require('chai');

describe('SauceDemo Login Tests', function () {
    this.timeout(30000);
    
    let browser;
    const browsers = ['chrome', 'microsoftedge'];
    const testData = [
        { username: '', password: '', expectedError: 'Username is required' }, // UC-1
        { username: 'test_user', password: '', expectedError: 'Password is required' }, // UC-2
        { username: 'standard_user', password: 'secret_sauce', expectedError: null } // UC-3
    ];

    browsers.forEach(browserName => {
        describe(`Testing on ${browserName}`, function () {
            before(async function () {
                browser = await remote({
                    capabilities: { browserName },
                    logLevel: 'info',
                });
                await browser.url('https://www.saucedemo.com/');
            });

            after(async function () {
                await browser.deleteSession();
            });

            testData.forEach(({ username, password, expectedError }) => {
                it(`Login with username: "${username}" and password: "${password}"`, async function () {
                    await browser.$('//input[@id="user-name"]').setValue(username);
                    await browser.$('//input[@id="password"]').setValue(password);
                    await browser.$('//input[@id="login-button"]').click();

                    if (expectedError) {
                        const errorMessage = await browser.$('//h3[@data-test="error"]').getText();
                        expect(errorMessage).to.include(expectedError);
                    } else {
                        expect(await browser.getTitle()).to.equal('Swag Labs');
                    }
                });
            });
        });
    });
});
