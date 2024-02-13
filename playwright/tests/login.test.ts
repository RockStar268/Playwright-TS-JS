import { test, expect} from '@playwright/test';
// import { Base } from '../resources/config/base.ts';
// import { LoginPage } from '../resources/pageobjects/LoginPage.ts';
import { BASE_URL } from '../resources/data/globalVariables.ts';


// test('LoginClasses', async ({ page }) => {
//     const base = new Base();
//     const loginPage = new LoginPage(page);

//     await base.initializeBrowser();

//     await loginPage.login("test@test.nl", "AutomationTester")

//     await base.closeBrowser();
// });

test('Login', async ({page}) => {
    const loginButton = 'button[data-testid="login-button"]';
    const logoutButton = 'Log out'
    const emailInput = 'input[type="email"]';
    const passwordInput = 'input[type="password"]';
    const submitButton = 'button[type="submit"]';

    // act
    await page.goto(BASE_URL);
    await page.click(loginButton);
    await page.fill(emailInput, 'est@Test.com');
    await page.fill(passwordInput, "AutomationTester");
    await page.click(submitButton);


    // validate
    const validateLogoutButton = await page.getByText(logoutButton).isVisible();
    expect(validateLogoutButton).toBe(true);
});