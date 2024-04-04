import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage } from '../resources/enums/levelUpMessages';


const charName = ' 123 Test ';
const build = 'Mage'


test("Click 5 times to level up", async ({ page, homepage, playpage, levelup}) =>{

    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp(5);
    await expect(levelup.clickItButton).toBeDisabled();
    await expect(levelup.clickItLeveledUpMessage.textContent()).resolves.toBe(levelUpMessage.clickButton);
    
})


test("Click 4 times and no level up", async ({ page, homepage, playpage, levelup}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp(4);
    await expect(levelup.clickItButton).toBeEnabled();
    await expect(levelup.clickItLeveledUpMessage).not.toBeVisible();
    
})


test("Click 6 times, out of bound", async ({ page, homepage, playpage, levelup}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();  
    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    const clickFunction = async () => {
        await levelup.clickButtonToLevelUp(6);
    };
    await expect(clickFunction).rejects.toThrow('ERROR: Click button input is greater than 5');
})