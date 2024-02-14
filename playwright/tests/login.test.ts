import { test, expect} from '@playwright/test';
// import { Base } from '../resources/config/base.ts';
// import { LoginPage } from '../resources/pageobjects/LoginPage.ts';
import { LoginPage } from '../resources/pageobjects/LoginPage.ts';


test('Login', async ({page}) => {
    const login = new LoginPage(page);

    const loginButton = 'button[data-testid="login-button"]';
    const logoutButton = 'Log out'
    const emailInput = 'input[type="email"]';
    const passwordInput = 'input[type="password"]';
    const submitButton = 'button[type="submit"]';

    // act
    await page.goto("/");
    await login.login('test@tester.com', 'AutomationTester');

    // validate
    const validateLogoutButton = await page.getByText(logoutButton).isVisible();
    expect(validateLogoutButton).toBe(true);
});