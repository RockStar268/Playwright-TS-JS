import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage, LeveledUpParagraphText } from '../resources/enums/levelUpMessages';

const charName = 'QA Engineer';
const build = 'Brigadier'
const cheatCode = 'all your base are belong to us'; 
const stats = [
    { skill : 'Strength', value: "10" },
    { skill : 'Agility', value: "10" },
    { skill : 'Wisdom', value: "10" },
    { skill : 'Magic', value: "10" },
]

test('Reaching max stats with cheatcode with level 2', async({ page, homepage, playpage, levelup})=> {
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    await levelup.typeToLevelUp(cheatCode);
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(1, build.toLowerCase()));
    await expect(page).toHaveScreenshot('thief_level1_build.png');

    await levelup.clickButtonToLevelUp(5)
    await expect(levelup.clickItLeveledUpMessage).toHaveText(levelUpMessage.clickIt);
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(2, build.toLowerCase()));
    await expect(page).toHaveScreenshot('thief_level2_max_build.png');
    
    for (const [index, stat] of stats.entries()){
        const statSkill = levelup.stats.nth(index).locator('label');
        const statValue = levelup.stats.nth(index).locator('div span')

        await expect(statSkill).toHaveText(stat.skill);
        await expect(statValue).toHaveText(stat.value);
    }
})
