import { chromium, firefox, webkit, Browser, Page, BrowserContext } from 'playwright';
import { BASE_URL, BROWSER } from '../data/globalVariables'; 

export class Base {
    protected browser: Browser;
    protected page: Page;

    
    // Promise<void> handles asynchronous operations. It tells us it may take some time to complete it.
    async initializeBrowser(browserName: 'chromium' | 'firefox' | 'webkit' | 'chrome'  = BROWSER): Promise<void> {
        console.log("initiating browser");
        
        switch (browserName) {
            case 'chrome':
            case 'chromium':
                this.browser = await chromium.launch({ headless: false });
                await this.page.goto(BASE_URL);
                break;
            case 'firefox':
                this.browser = await firefox.launch({ headless: false });
                await this.page.goto(BASE_URL);
                break;
            case 'webkit':
                this.browser = await webkit.launch({ headless: false });
                await this.page.goto(BASE_URL);
                break;
            default:
                throw new Error('Unsupported browser type.');
        }
    }


    async closeBrowser(): Promise<void> {
        await this.browser.close();
    }

}

export default Base;
