import { expect, type Locator, type Page } from '@playwright/test';


export class LevelUpPage{
    readonly page : Page;
    readonly clickLevelUpButton : Locator;
    readonly clickLevelUpMessage : Locator; 


    constructor( page: Page){
        this.page = page;
        this.clickLevelUpButton = page.locator('//button[text()="Click me "]');
        this.clickLevelUpMessage = page.locator('//span[@data-task="clicker"]');
    }

    async clickButtonToLevelUp(j: number){
        if (await this.clickLevelUpButton.isVisible()){
            if( j > 5){
                throw new Error('ERROR: Click button input is greater than 5');
            }
            else{
                for(let i=j; i>0; i--){
                    await expect(this.clickLevelUpButton).toBeEnabled()
                    await this.clickLevelUpButton.click();
            }}
    }}}
