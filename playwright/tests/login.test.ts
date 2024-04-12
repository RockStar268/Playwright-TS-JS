import { test, expect} from '../resources/config/fixtures';

test('Login', async ({page, login}) => {
    const logoutButton = 'Log out'

    // act
    await page.goto("/");
    // await expect(page).toHaveScreenshot('homepage_notLoggedIn.png');
    await login.login('test@tester.com', 'AutomationTester');
    // await expect(page).toHaveScreenshot('homepage_LoggedIn.png');
    
    // validate
    const validateLogoutButton = await page.getByText(logoutButton).isVisible();
    expect(validateLogoutButton).toBe(true);

});