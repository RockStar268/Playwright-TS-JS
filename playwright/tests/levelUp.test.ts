import { test , expect} from '../resources/config/fixtures';
import { levelUpMessage } from '../resources/enums/levelUpMessages';

test("Click 5 times to level up", async ({ page, homepage, playpage, levelup}) =>{

    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild('Mage');
    await playpage.fillInCharacterName(' 123 Test ');
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp(5);
    await expect(levelup.clickLevelUpButton).toBeDisabled();
    await expect(levelup.clickLevelUpMessage.textContent()).resolves.toBe(levelUpMessage.clickButton);
    
})


test("Click 4 times and no level up", async ({ page, homepage, playpage, levelup}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild('Mage');
    await playpage.fillInCharacterName(' 123 Test ');
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp(4);
    await expect(levelup.clickLevelUpButton).toBeEnabled();
    await expect(levelup.clickLevelUpMessage).not.toBeVisible();
    
})

test("Click 6 times, out of bound", async ({ page, homepage, playpage, levelup}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();  
    await playpage.selectBuild('Mage');
    await playpage.fillInCharacterName(' 123 Test ');
    await playpage.clickStartButton();

    const clickFunction = async () => {
        await levelup.clickButtonToLevelUp(6);
    };
    await expect(clickFunction).rejects.toThrow('ERROR: Click button input is greater than 5');
})