import "dotenv/config";
import { expect, Locator, Page } from '@playwright/test';
export class HomePage {
    readonly url = "https://tg-bet.com";
    readonly page: Page;
    readonly btnClose: Locator;


    constructor(page: Page) {
        this.page = page;
        this.btnClose = page.locator('button.daily-bonus__close svggggg');
    }

    async visitPage(){
        await this.page.goto(this.url);
        this.page.setDefaultTimeout(10000);
        this.page.waitForLoadState('load');
        await this.page.evaluate(() => {
            localStorage.setItem('token', "295570|uRvME7Uu8ipK2CxJXPMCBkMewcPYB1UoHDGeb0TL");
        });
        const token = await this.page.evaluate(() => localStorage.getItem('token'));
        expect(token).toBe("295570|uRvME7Uu8ipK2CxJXPMCBkMewcPYB1UoHDGeb0TL");
        await this.page.evaluate(() => {
            document.body.setAttribute('tabindex', '-1');
            document.body.focus();
        });

        // Perform actions after focusing
        await this.page.keyboard.type('Focused on body');
    }


    async clickCloseButton() {
        await this.btnClose.waitFor({state:"visible"});
        await this.btnClose.click();
    }
}