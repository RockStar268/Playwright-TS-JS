import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage } from '../resources/enums/levelUpMessages';

const charName = 'QA Engineer';
const build = 'Brigadier'

test('Upload File to level up', async({ page , homepage, playpage, levelup}) => {
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();

    expect(levelup.UploadFileLeveldUpMessage).not.toBeVisible();
    await levelup.uploadFileToLevelUp();
    await expect(levelup.UploadFileLeveldUpMessage.textContent()).resolves.toBe(levelUpMessage.levelUp);
})