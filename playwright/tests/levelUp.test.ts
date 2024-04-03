import { test } from '../resources/config/fixtures';

test("clickToLevelUp", async ({ page, homepage, playpage, levelup}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();  

    await playpage.selectBuild('Mage');
    await playpage.fillInCharacterName(' 123 Test ');
    await playpage.clickStartButton();

    await levelup.clickButtonToLevelUp();
    
})
