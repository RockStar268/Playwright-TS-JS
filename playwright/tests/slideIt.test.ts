import { test, expect } from '../resources/config/fixtures';
import { levelUpMessage, LeveledUpParagraphText } from '../resources/enums/levelUpMessages';

const charName = 'Slider';
const build = 'Thief'

test('Move slider to max to level up', async({ page, homepage, playpage, levelup }) =>{
    const slideTo100 = page.locator('//section[@data-testid="adventure-slider"]//div[@class="flex items-center justify-between"]');

    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild(build);
    await playpage.fillInCharacterName(charName);
    await playpage.clickStartButton();
    await expect(levelup.Slider).not.toHaveAttribute('aria-valuenow="0"');
    await levelup.slideToLevelUp(slideTo100);

    await expect(levelup.SliderLeveledUpMessage).toHaveText(levelUpMessage.slideIt);
    await expect(levelup.Slider).toHaveAttribute('aria-valuenow', '100');
    await expect(levelup.Slider).toHaveAttribute('data-disabled');
    await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(2, build.toLowerCase()));
})
