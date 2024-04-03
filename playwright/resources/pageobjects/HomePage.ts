import {type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page : Page;
    readonly playButton : Locator; 
    readonly githubButton : Locator;

    constructor( page: Page) {
        this.page = page;
        this.playButton = page.getByText('Click here to play');
        this.githubButton = page.getByText('View on Github');
    }
    async clickOnPlayButton() {
        await this.playButton.click();
    }

    async clcikOnViewGithubButton(){
        await this.githubButton.click();
    }
    
}