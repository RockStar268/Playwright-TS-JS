import { test as baseTest} from "@playwright/test";
import { LevelUpPage } from '../pageobjects/LevelUpPage';
import { PlayPage } from '../pageobjects/PlayPage';
import { HomePage } from '../pageobjects/HomePage';
import { LoginPage } from '../pageobjects/LoginPage';


type pages = {
    levelup : LevelUpPage;
    playpage : PlayPage;
    homepage : HomePage;
    login : LoginPage;
}

const testPages = baseTest.extend<pages>({
    levelup: async ({page}, use) =>{
        await use(new LevelUpPage(page));
    },
    playpage: async ({page}, use) =>{
        await use(new PlayPage(page));
    },
    homepage: async ({page}, use) =>{
        await use(new HomePage(page));
    },
    login: async ({page}, use) =>{
        await use(new LoginPage(page));
    },
})

export const test = testPages;
export const expect = testPages.expect;

