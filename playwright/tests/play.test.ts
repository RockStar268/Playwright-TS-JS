import { test, expect} from '../resources/config/fixtures';
import { BUILDS } from '../resources/data/globalVariables';
import { errorMessages } from '../resources/enums/errorMessages';


test("Character Name Input Field Placeholder Validation", async ({ page , homepage, playpage}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();   
    await expect(playpage.characterNameInput).toBeVisible();  // element is located by placeholder
})


test("Character Name Field Mandatory", async ({ page , homepage, playpage}) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();   
    await expect(playpage.minCharErrorMessage).not.toBeVisible();
    await playpage.clickStartButton();
    await expect(playpage.minCharErrorMessage).toBeVisible();
    await expect(playpage.minCharErrorMessage.textContent()).resolves.toBe(errorMessages.characterNameMinCharacter);
})



const charName = ['12', '123', '12345678901234567890', '123456789012345678901']

for (const buildName of charName){
    test('character name input field '+ buildName , async({ page, homepage, playpage, levelup }) =>{
        await page.goto("/");
        await homepage.clickOnPlayButton();   
        await playpage.fillInCharacterName(buildName);
        await playpage.validateCharacterName(buildName);
        await playpage.clickStartButton();

        if (buildName.length < 3){
            await expect(playpage.minCharErrorMessage.textContent()).resolves.toBe(errorMessages.characterNameMinCharacter);
        }
        else if(buildName.length > 20){
            await expect(playpage.maxCharErrorMessage.textContent()).resolves.toBe(errorMessages.characterNameMaxCharacter);
        }
        else{
            expect(levelup.clickItButton).toBeTruthy();
        }
    })
}


test("buildCharacters", async ({ page, homepage, playpage }) =>{
    await page.goto("/");
    await homepage.clickOnPlayButton();    

    for(const build of BUILDS){
        await playpage.selectBuild(build);
        expect(playpage.validateSelectedBuild(build))
        }
})



test("selectBuild", async ({ page, homepage, playpage }) =>{
    const buildName = ' 123 Test '

    await page.goto("/");
    await homepage.clickOnPlayButton();  

    // select brigadier
    await playpage.selectBuild('Brigadier');
    await playpage.fillInCharacterName(buildName);
    await playpage.validateCharacterName(buildName);
    await playpage.clickStartButton();
    });