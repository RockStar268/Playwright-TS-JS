import { expect, type Locator, type Page } from '@playwright/test';


export class LevelUpPage{
    readonly page : Page;
    readonly LevelUpButton : Locator;
    readonly LevelUpMessage : Locator; 


    constructor( page: Page){
        this.page = page;
        this.LevelUpButton = page.locator('//button[text()="Click me "]');
        this.LevelUpMessage = page.locator('//span[@data-task="clicker"]');
    }

    async clickButtonToLevelUp(j: number){
        if (await this.LevelUpButton.isVisible()){
            if( j > 5){
                throw new Error('ERROR: Click button input is greater than 5');
            }
            else{
                for(let i=j; i>0; i--){
                    await expect(this.LevelUpButton).toBeEnabled()
                    await this.LevelUpButton.click();
            }}
    }}}
