import { test, expect, chromium} from '@playwright/test';
import { HomePage } from '../resources/pageobjects/HomePage';
import { BASE_URL } from '../resources/data/globalVariables';
import { error } from 'console';
import { start } from 'repl';

test("validateCharacterNamePlaceholder", async ({ page }) =>{
    const homepage = new HomePage(page);

    const playButton = page.getByText('Click here to play');
    const characterNameInput = page.locator('//input[@placeholder="Galactic space lord"]');

    await page.goto(BASE_URL);
    await playButton.click();
    // await homepage.clickOnPlay;   

    await page.waitForTimeout(1000);
    const characterNamePlaceholder = await characterNameInput.isVisible();
    expect (characterNamePlaceholder).toBe(true);

})

test("mandatoryCharacterNameInput", async ({ page }) =>{
    const homepage = new HomePage(page);

    const playButton = page.getByText('Click here to play');
    const startButton = page.getByText('Start!');
    const errorMessage = page.getByText('Name must be at least 3 characters');

    await page.goto(BASE_URL);
    await playButton.click();
    // await homepage.clickOnPlay;   

    await expect(errorMessage).not.toBeVisible();
    
    await startButton.scrollIntoViewIfNeeded();
    await startButton.click();
    await expect(errorMessage).toBeVisible();

})

test("buildCharacters", async ({ page }) =>{
    const homepage = new HomePage(page);

    const playButton = page.getByText('Click here to play');
    const builds = ['Thief', 'Knight', 'Mage', 'Brigadier'];
    const buildLevel = page.locator('//p[@data-testid="character-stats"]');
    

    await page.goto(BASE_URL);
    await playButton.click();
    // await homepage.clickOnPlay;   

    for(const build of builds){
        switch(build){
            case 'Thief':
                await page.selectOption('select[aria-hidden="true"]', {value: build.toLowerCase()});
                await expect(buildLevel.textContent()).resolves.toBe('A level 1 thief');
                break;
            case 'Knight':
                await page.selectOption('select[aria-hidden="true"]', {value: build.toLowerCase()});
                await expect(buildLevel.textContent()).resolves.toBe('A level 1 knight');
                break;    
            case 'Mage':
                await page.selectOption('select[aria-hidden="true"]', {value: build.toLowerCase()});
                await expect(buildLevel.textContent()).resolves.toBe('A level 1 mage');
                break;    
            case 'Brigadier':
                await page.selectOption('select[aria-hidden="true"]', {value: build.toLowerCase()});
                await expect(buildLevel.textContent()).resolves.toBe('A level 1 brigadier');
                break;  
            default:
                console.log('Invalid build choice..')  
                break;
        }
    }
})



test("selectBuild", async ({ page }) =>{
    const homepage = new HomePage(page);

    const playButton = page.getByText('Click here to play');
    const builds = ['Thief', 'Knight', 'Mage', 'Brigadier'];
    const buildLevel = page.locator('//p[@data-testid="character-stats"]');
    const characterNameInput = page.locator('//input[@placeholder="Galactic space lord"]');
    const startButton = page.getByText('Start!');

    const buildName = ' 123 Test '
    const characterName = page.getByTestId('character-name')


    await page.goto(BASE_URL);
    await playButton.click();
    // await homepage.clickOnPlay;   

    // select brigadier
    await page.selectOption('select[aria-hidden="true"]', {value: builds[3].toLowerCase()});
    await expect(buildLevel.textContent()).resolves.toBe('A level 1 brigadier');
    await characterNameInput.fill(buildName);
    await startButton.click();

    const characterNameValue = await characterName.textContent();

    // character level up page validation
    expect(characterNameValue).toBe(buildName);
    await expect(buildLevel.textContent()).resolves.toBe('A level 1 brigadier');

    });