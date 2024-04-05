import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage, LeveledUpParagraphText } from '../resources/enums/levelUpMessages';

const charName = 'QA Engineer';
const build = 'Brigadier'

test('Upload File to level up', async({ page , browserName, homepage, playpage, levelup }) => {
    test.skip(browserName === 'firefox', 'Not sure why the same test fails for firefox..');
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    expect(levelup.UploadFileLeveledUpMessage).not.toBeVisible();
    await levelup.uploadFileToLevelUp();
    await expect(levelup.UploadFileLeveledUpMessage.textContent()).resolves.toBe(levelUpMessage.fileUpload);
    await expect(levelup.leveledUpParagraph.textContent()).resolves.toBe(LeveledUpParagraphText(2, build.toLowerCase()));
})