import { test , expect } from '../resources/config/fixtures';
import { levelUpMessage, LeveledUpParagraphText } from '../resources/enums/levelUpMessages';

const textInput = ['Lorem Ipsum', 'lorem Ipsum', ]
const charName = 'QA Engineer';
const build = 'Knight'

for (const input of textInput){
    test('Type to level up' + input, async({ page , homepage, playpage, levelup}) =>{
        await page.goto("/");
        await homepage.clickOnPlayButton();  

        await playpage.selectBuild(build);
        await playpage.fillInCharacterName(charName);
        await playpage.clickStartButton();
        await levelup.typeToLevelUp(input);

        switch (input){
            case 'Lorem Ipsum':
                expect(levelup.loremIpsumLeveledUpMessage).toBeVisible();
                await expect(levelup.loremIpsumLeveledUpMessage).toHaveText(levelUpMessage.typeIt);
                await expect(levelup.leveledUpParagraph).toHaveText(LeveledUpParagraphText(2, build.toLowerCase()));
                break;
            default:
                expect(levelup.loremIpsumLeveledUpMessage).not.toBeVisible();
                break;
        }
    });
}

