import { type Locator, type Page } from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly loginButton : Locator;
    readonly logoutButton : Locator;
    readonly emailInput : Locator ;
    readonly passwordInput : Locator;
    readonly submitButton : Locator;

    constructor( page: Page) {
        this.page= page;
        this.loginButton = page.locator('button[data-testid="login-button"]');
        this.logoutButton = page.getByText('Log out');
        this.emailInput = page.locator('//input[@type="email"]');
        this.passwordInput = page.locator('//input[@type="password"]');
        this.submitButton = page.locator('//button[@type="submit"]');
    }

    async login(email: string, password: string) {
        await this.loginButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill( password);
        await this.submitButton.click();
    }

    async logout(){
        await this.logoutButton.click();
    }
    
}