import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage, LeveledUpParagraphText } from '../resources/enums/levelUpMessages';

const build = 'Mage'

test.beforeEach(async ({ page, homepage, playpage }) => {
    const charName = ' 123 Test ';
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();
  });

test("Click 5 times to level up", async ({ page, homepage, playpage, levelup}) =>{
    await levelup.clickButtonToLevelUp(5);
    await expect(levelup.clickItButton).toBeDisabled();
    await expect(levelup.clickItLeveledUpMessage).toHaveText(levelUpMessage.clickIt);
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(2, build.toLowerCase()));

    
})


test("Click 4 times and no level up", async ({ page, homepage, playpage, levelup}) =>{
    await levelup.clickButtonToLevelUp(4);
    await expect(levelup.clickItButton).toBeEnabled();
    await expect(levelup.clickItLeveledUpMessage).not.toBeVisible();
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(1, build.toLowerCase()));

    
})


test("Click 6 times, out of bound", async ({ page, homepage, playpage, levelup}) =>{
    const clickFunction = async () => {
        await levelup.clickButtonToLevelUp(6);
    };
    await expect(clickFunction).rejects.toThrow('ERROR: Click button input is greater than 5');
})