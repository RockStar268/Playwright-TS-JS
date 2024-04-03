import { expect, type Locator, type Page } from '@playwright/test';


export class PlayPage{
    readonly page : Page;
    readonly characterNameInput : Locator;
    readonly buildLevel : Locator;
    readonly startButton : Locator; 
    readonly errorMessage : Locator; 
    readonly characterName : Locator;

    constructor( page: Page){
        this.page = page;
        this.characterNameInput = page.locator('//input[@placeholder="Galactic space lord"]');
        this.buildLevel = page.locator('//p[@data-testid="character-stats"]');
        this.startButton = page.getByText('Start!');
        this.errorMessage = page.getByText('Name must be at least 3 characters');
        this.characterName = page.locator('//h3[@data-testid="character-name"]');
    }

    async selectBuild(build){
        await this.page.selectOption('select[aria-hidden="true"]', {value: build.toLowerCase()});
        await expect(this.buildLevel.textContent()).resolves.toBe('A level 1 ' + build.toLowerCase());

    }

    async fillInCharacterName(name){
        await this.characterNameInput.fill(name);

    }
    
    async clickStartButton(){
        await this.startButton.click();
    }

    async validateCharacterName(characterName){
        await expect(this.characterName.textContent()).resolves.toBe(characterName);
    }
}