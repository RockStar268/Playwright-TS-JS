import { test, expect, chromium} from '@playwright/test';
import { HomePage } from '../resources/pageobjects/HomePage';
import { BUILDS } from '../resources/data/globalVariables';
import { PlayPage } from '../resources/pageobjects/PlayPage';
import { LevelUpPage } from '../resources/pageobjects/LevelUpPage';

test("clickToLevelUp", async ({ page }) =>{
    const homepage = new HomePage(page);
    const playpage = new PlayPage(page);
    const levelup = new LevelUpPage(page);

    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild('Mage');
    await playpage.fillInCharacterName(' 123 Test ');
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp();
    
})
