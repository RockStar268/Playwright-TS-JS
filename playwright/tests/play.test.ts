import { test, expect, chromium} from '@playwright/test';
import { HomePage }  from '../resources/pageobjects/HomePage';
import { PlayPage } from '../resources/pageobjects/PlayPage';
import { BUILDS } from '../resources/data/globalVariables';


test("validateCharacterNamePlaceholder", async ({ page }) =>{
    const homepage = new HomePage(page);
    const playpage = new PlayPage(page);

    await page.goto("/");
    await homepage.clickOnPlayButton();   

    await page.waitForTimeout(1000);
    await expect(playpage.characterNameInput).toBeVisible();

})

test("mandatoryCharacterNameInput", async ({ page }) =>{
    const homepage = new HomePage(page);
    const playpage = new PlayPage(page);

    await page.goto("/");
    await homepage.clickOnPlayButton();   

    await expect(playpage.errorMessage).not.toBeVisible();
    
    await playpage.clickStartButton();
    await expect(playpage.errorMessage).toBeVisible();

})

test("buildCharacters", async ({ page }) =>{
    const homepage = new HomePage(page);
    const playpage = new PlayPage(page);
    

    await page.goto("/");
    await homepage.clickOnPlayButton();    

    for(const build of BUILDS){
        await playpage.selectBuild(build);
        }
})



test("selectBuild", async ({ page }) =>{
    const homepage = new HomePage(page);
    const playpage = new PlayPage(page);

    const buildName = ' 123 Test '

    await page.goto("/");
    await homepage.clickOnPlayButton();   

    // select brigadier
    await playpage.selectBuild('Brigadier');
    await playpage.fillInCharacterName(buildName);
    await playpage.validateCharacterName(buildName);
    await playpage.clickStartButton();

    });