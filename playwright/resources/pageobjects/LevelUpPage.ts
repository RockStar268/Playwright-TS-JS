import { expect, type Locator, type Page } from '@playwright/test';


export class LevelUpPage{
    readonly page : Page;
    
    // click to level up
    readonly clickItButton : Locator;
    readonly clickItLeveledUpMessage : Locator; 

    // upload to level up
    readonly UploadFileButton : Locator;
    readonly UploadFileLeveldUpMessage : Locator;

    constructor( page: Page){
        this.page = page;

        // click to level up 
        this.clickItButton = page.locator('//button[text()="Click me "]');
        this.clickItLeveledUpMessage = page.locator('//span[@data-task="clicker"]');

        // upload to level up
        this.UploadFileButton = page.locator('//input[@type="file"]');
        this.UploadFileLeveldUpMessage = page.locator('//span[@data-task="uploader"]');
    }

    async clickButtonToLevelUp(j: number){
        if (await this.clickItButton.isVisible()){
            if( j > 5){
                throw new Error('ERROR: Click button input is greater than 5');
            }
            else{
                for(let i=j; i>0; i--){
                    await expect(this.clickItButton).toBeEnabled()
                    await this.clickItButton.click();
            }};
    }}


    async uploadFileToLevelUp(){
        const pathFile = '../img/testCoders.png'
        await this.UploadFileButton.setInputFiles(pathFile);
    }
}
