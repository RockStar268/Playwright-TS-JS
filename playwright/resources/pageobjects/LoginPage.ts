import { Page } from 'playwright';

export class LoginPage {
    readonly loginButton = 'button[data-testid="login-button"]';
    readonly logoutButton = 'Log out'
    readonly emailInput = 'input[type="email"]';
    readonly passwordInput = 'input[type="password"]';
    readonly submitButton = 'button[type="submit"]';

    constructor( private page: Page) {}

    async login(email: string, password: string) {
  
    // await this.page.goto(BASE_URL);
    await this.page.click(this.loginButton);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
    }
    
}