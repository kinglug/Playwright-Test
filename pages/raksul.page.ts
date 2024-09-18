
import { expect, Locator, Page } from '@playwright/test';
export class RaksulPage {
    readonly url = "https://raksul.github.io/recruit-qa-engineer-work-sample/";
    readonly page: Page;
    readonly txtEmail: Locator;
    readonly txtLastName: Locator;
    readonly txtFirstName: Locator;
    readonly inforSource: Locator;
    readonly btnSubmit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtEmail = page.locator('#form_item_email');
        this.txtLastName = page.locator('#form_item_lastName');
        this.txtFirstName = page.locator('#form_item_firstName');
        this.inforSource = page.locator('div.ant-select-selector');
        this.btnSubmit = page.getByRole('button', { name: 'Submit' })
    }

    async visitPageRaksul() {
        await this.page.goto(this.url);
        this.page.setDefaultTimeout(10000);
        this.page.waitForLoadState('load');
    }

    async enterEmail(email: string){
        await this.txtEmail.fill(email);
    }

    async enterLastName(lastname: string){
        await this.txtLastName.fill(lastname);
    }

    async enterFirstName(firstname: string){
        await this.txtFirstName.fill(firstname)
    }

    async selectInforSource(){
        await this.inforSource.click();
    }

    async clickButtonSubmit() {
        await this.btnSubmit.waitFor({ state: "visible" });
        await this.btnSubmit.click();
    }



}