import { test, expect} from '../resources/config/fixtures';

test('Login', async ({page, login}) => {
    const logoutButton = 'Log out'

    // act
    await page.goto("/");
    await login.login('test@tester.com', 'AutomationTester');

    // validate
    const validateLogoutButton = await page.getByText(logoutButton).isVisible();
    expect(validateLogoutButton).toBe(true);
});