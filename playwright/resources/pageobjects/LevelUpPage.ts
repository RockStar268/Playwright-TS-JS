import { expect, type Locator, type Page } from '@playwright/test';


export class LevelUpPage{
    readonly page : Page;

    // leveled up text
    readonly leveledUpParagraph: Locator;
    
    // click to level up
    readonly clickItButton : Locator;
    readonly clickItLeveledUpMessage : Locator; 

    // upload to level up
    readonly UploadFileButton : Locator;
    readonly UploadFileLeveledUpMessage : Locator;

    // type to level up
    readonly LoremIpsumInputField : Locator;
    readonly LoremIpsumLeveledUpMessage : Locator;


    constructor( page: Page){
        this.page = page;
        this.leveledUpParagraph = page.locator('//p[@data-testid="character-stats"]')

        // click to level up 
        this.clickItButton = page.locator('//button[text()="Click me "]');
        this.clickItLeveledUpMessage = page.locator('//span[@data-task="clicker"]');

        // upload to level up
        this.UploadFileButton = page.locator('//input[@type="file"]');
        this.UploadFileLeveledUpMessage = page.locator('//span[@data-task="uploader"]');

        // type to level up
        this.LoremIpsumInputField = page.locator('//section[@data-testid="adventure-typer"]/div[2]/input');
        this.LoremIpsumLeveledUpMessage = page.locator('//span[@data-task="typer"]')
    }

    async clickButtonToLevelUp(timesClicking: number){
        if (await this.clickItButton.isVisible()){
            if( timesClicking > 5){
                throw new Error('ERROR: Click button input is greater than 5');
            }
            else{
                for(let i=timesClicking; i>0; i--){
                    await expect(this.clickItButton).toBeEnabled()
                    await this.clickItButton.click();
            }};
    }}


    async uploadFileToLevelUp(){
        const pathFile = '../img/testCoders.png'
        await this.UploadFileButton.setInputFiles(pathFile);
    }


    async typeToLevelUp(inputText: string){
        await this.LoremIpsumInputField.fill(inputText);
    }
}
