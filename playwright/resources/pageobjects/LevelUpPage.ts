import { expect, type Locator, type Page } from '@playwright/test';
import { BUILDS } from '../data/globalVariables';

export class LevelUpPage{
    readonly page : Page;
    readonly clickLevelUpButton : Locator;
    readonly clickLevelUpMessage : Locator; 


    constructor( page: Page){
        this.page = page;
        this.clickLevelUpButton = page.locator('//button[text()="Click me "]');
        this.clickLevelUpMessage = page.locator('//span[@data-task="clicker"]');
    }

    async clickButtonToLevelUp(){
        if (await this.clickLevelUpButton.isVisible()){
            let i;
            for(i=5; i>0; i--){
                await expect(this.clickLevelUpButton).toBeEnabled()
                await this.clickLevelUpButton.click();
            }
            await expect(this.clickLevelUpButton).toBeDisabled();
            await expect(this.clickLevelUpMessage.textContent()).resolves.toBe('Great job! You levelled up');
        }
    }

    
}