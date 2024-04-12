import { expect, type Locator, type Page } from '@playwright/test';


export class LevelUpPage{
    readonly page : Page;

    // leveled up text
    readonly leveledUpParagraph: Locator;
    
    // click to level up
    readonly clickItButton : Locator;
    readonly clickItLeveledUpMessage : Locator; 

    // upload to level up
    readonly uploadFileButton : Locator;
    readonly uploadFileLeveledUpMessage : Locator;

    // type to level up
    readonly loremIpsumInputField : Locator;
    readonly loremIpsumLeveledUpMessage : Locator;

    // slide to level up
    readonly slider : Locator;
    readonly sliderLeveledUpMessage : Locator;

    // stats elements
    readonly stats : Locator;


    constructor( page: Page){
        this.page = page;
        this.leveledUpParagraph = page.locator('//p[@data-testid="character-stats"]')

        // click to level up 
        this.clickItButton = page.locator('//button[text()="Click me "]');
        this.clickItLeveledUpMessage = page.locator('//span[@data-task="clicker"]');

        // upload to level up
        this.uploadFileButton = page.locator('//input[@type="file"]');
        this.uploadFileLeveledUpMessage = page.locator('//span[@data-task="uploader"]');

        // type to level up
        this.loremIpsumInputField = page.locator('//section[@data-testid="adventure-typer"]/div[2]/input');
        this.loremIpsumLeveledUpMessage = page.locator('//span[@data-task="typer"]');

        // slide to level up
        this.slider = page.locator('//span[@role="slider"]');
        this.sliderLeveledUpMessage = page.locator('//span[@data-task="slider"]')

        // stats
        this.stats = page.locator('//section[@data-testid="character-stats"]/div')
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
            }}
    }}


    async uploadFileToLevelUp(){
        const pathFile = '../img/testCoders.png'
        await this.uploadFileButton.setInputFiles(pathFile);
    }


    async typeToLevelUp(inputText: string){
        await this.loremIpsumInputField.fill(inputText);
    }

    async slideToLevelUp(element : Locator){
        await this.slider.dragTo(element);
    }
}
