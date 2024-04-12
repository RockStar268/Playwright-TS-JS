import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage, LeveledUpParagraphText } from '../resources/enums/levelUpMessages';

const charName = 'QA Engineer';
const build = 'Brigadier'

test('Max Level Build', async({ page, browserName, homepage, playpage, levelup }) =>{
    test.skip(browserName === 'firefox', 'Upload to level up fails on firefox');
    const slideTo100 = page.locator('//section[@data-testid="adventure-slider"]//div[@class="flex items-center justify-between"]');

    await page.goto("/");
    await homepage.clickOnPlayButton();  
    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp(5)
    await expect(levelup.clickItLeveledUpMessage).toHaveText(levelUpMessage.clickIt);
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(2, build.toLowerCase()));

    await levelup.typeToLevelUp('Lorem Ipsum');
    await expect(levelup.loremIpsumLeveledUpMessage).toHaveText(levelUpMessage.typeIt);
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(3, build.toLowerCase()));

    await levelup.uploadFileToLevelUp();
    await expect(levelup.uploadFileLeveledUpMessage).toHaveText(levelUpMessage.fileUpload);
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(4, build.toLowerCase()));    

    await levelup.slideToLevelUp(slideTo100);
    await expect(levelup.sliderLeveledUpMessage).toHaveText(levelUpMessage.slideIt);
    await expect(levelup.slider).toHaveAttribute('aria-valuenow', '100');
    await expect(levelup.slider).toHaveAttribute('data-disabled');
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(5, build.toLowerCase()));
})
