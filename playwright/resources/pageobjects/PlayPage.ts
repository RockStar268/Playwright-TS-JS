import { expect, type Locator, type Page } from '@playwright/test';
import { errorMessages } from '../enums/errorMessages';


export class PlayPage{
    readonly page : Page;
    readonly characterNameInput : Locator;
    readonly buildLevel : Locator;
    readonly startButton : Locator; 
    readonly minCharErrorMessage : Locator; 
    readonly maxCharErrorMessage : Locator;
    readonly characterName : Locator;
    readonly buildName : Locator;

    constructor( page: Page){
        this.page = page;
        this.characterNameInput = page.locator('//input[@placeholder="Galactic space lord"]');
        this.buildLevel = page.locator('//p[@data-testid="character-stats"]');
        this.startButton = page.getByText('Start!');
        this.minCharErrorMessage = page.getByText(errorMessages.characterNameMinCharacter);
        this.maxCharErrorMessage = page.getByText(errorMessages.characterNameMaxCharacter);
        this.characterName = page.locator('//h3[@data-testid="character-name"]');
        this.buildName = page.locator('//p[@data-testid="character-stats"]')
    }

    async selectBuild(build: string){
        await this.page.selectOption('select[aria-hidden="true"]', {value: build.toLowerCase()});
    }

    async fillInCharacterName(name: string){
        await this.characterNameInput.fill(name);
    }
    
    async clickStartButton(){
        await this.startButton.click();
    }

    async validateCharacterName(characterName: string){
        await expect(this.characterName.textContent()).resolves.toBe(characterName);
    }

    async validateSelectedBuild(build: string){
        await expect(this.buildName.textContent()).resolves.toBe('A level 1 ' + build.toLowerCase())
    }
}


