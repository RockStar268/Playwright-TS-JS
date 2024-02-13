import { Page } from 'playwright';
import { expect} from '@playwright/test';
export class HomePage {
    readonly playButton = 'Click here to play';
    readonly githubButton = 'View on Github';
    readonly yourCharacter = '//h3[@data-testid="character-name"]';

    constructor( private page: Page) {}

    async clickOnPlay() {
        await this.page.getByText(this.playButton).click();
    }

    async viewGithub(){
        await this.page.click(this.githubButton)
    }
    
}