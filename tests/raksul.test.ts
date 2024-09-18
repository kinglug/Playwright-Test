
import { test, expect } from '@playwright/test';
import { RaksulPage } from '../pages/raksul.page';


test.describe('Raksul Page', async () => {
    test.beforeEach('Access To Raksul Page', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.visitPageRaksul();
    });

    test('Submit when there is not enough information', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.clickButtonSubmit();
        await expect(page.locator('div.ant-form-item-explain-error').nth(0)).toHaveText("'email' is required");
        await expect(page.locator('div.ant-form-item-explain-error').nth(1)).toHaveText("'lastName' is required");
        await expect(page.locator('div.ant-form-item-explain-error').nth(2)).toHaveText("'firstName' is required");
        await expect(page.locator('div.ant-form-item-explain-error').nth(3)).toHaveText("'infoSource' is required");
        await expect(page.locator('div.ant-form-item-explain-error').nth(4)).toHaveText("'servicesOfInterest' is required");
        await expect(page.locator('div.ant-form-item-explain-error').nth(5)).toHaveText("'typeOfAssociation' is required");
    })

    test('Verify Email with format correct', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.enterEmail('abc@abc.com');
        await expect(page.locator('div.ant-form-item-explain-error').nth(0)).not.toBeVisible();
    })

    test('Verify Email with format incorrect', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.enterEmail('abc@abc');
        await expect(page.locator('div.ant-form-item-explain-error').nth(0)).toBeVisible();
        await expect(page.locator('div.ant-form-item-explain-error').nth(0)).toHaveText("'email' is not a valid email");
    })

    test('Verify Last Name have data', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.enterLastName('Tran');
        await expect(page.locator('div.ant-form-item-explain-error').nth(1)).not.toBeVisible();
    })

    test('Verify First Name have data', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.enterFirstName('Duy');
        await expect(page.locator('div.ant-form-item-explain-error').nth(2)).not.toBeVisible();
    })

    test('Select Infor Source', async ({ page }) => {
        const raksulpage = new RaksulPage(page);
        await raksulpage.selectInforSource();
        await page.keyboard.press('ArrowDown'); 
        await page.keyboard.press('ArrowDown'); // Social Media
        await page.keyboard.press('Enter');
        await expect(page.locator('span.ant-select-selection-item')).toHaveText('Social media');
    })

    test('Check and Uncheck services of interest',async({page})=>{
        // Check and uncheck Printing
        const checkBoxPrinting =  page.locator('span.ant-checkbox').nth(0);
        await checkBoxPrinting.check();
        expect(checkBoxPrinting.isChecked).toBeTruthy();
        await checkBoxPrinting.uncheck();
        expect(checkBoxPrinting.isChecked).toBeTruthy();

        // Check and uncheck Logistics
        const checkBoxLogistics =  page.locator('span.ant-checkbox').nth(1);
        await checkBoxLogistics.check();
        expect(checkBoxLogistics.isChecked).toBeTruthy();
        await checkBoxLogistics.uncheck();
        expect(checkBoxLogistics.isChecked).toBeTruthy();

        // Check and uncheck Advertisement
        const checkBoxAdvertisement =  page.locator('span.ant-checkbox').nth(2);
        await checkBoxAdvertisement.check();
        expect(checkBoxAdvertisement.isChecked).toBeTruthy();
        await checkBoxAdvertisement.uncheck();
        expect(checkBoxAdvertisement.isChecked).toBeTruthy();
    })

    test('Check and UnCheck type of association',async ({page})=>{
        // Check Prospect
        const checkBoxProspect = page.locator('span.ant-radio input').nth(0);
        await checkBoxProspect.check();
        expect(checkBoxProspect.isChecked).toBeTruthy();

        // Check Partner
        const checkBoxPartner = page.locator('span.ant-radio input').nth(1);
        await checkBoxPartner.check();
        expect(checkBoxPartner.isChecked).toBeTruthy();
        
        // Check Reseller
        const checkBoxReseller = page.locator('span.ant-radio input').nth(2);
        await checkBoxReseller.check();
        expect(checkBoxReseller.isChecked).toBeTruthy();

        // Check Vendor
        const checkBoxVendor = page.locator('span.ant-radio input').nth(3);
        await checkBoxVendor.check();
        expect(checkBoxVendor.isChecked).toBeTruthy();
    
        // Check Other
        const checkBoxOther = page.locator('span.ant-radio input').nth(4);
        await checkBoxOther.check();
        expect(checkBoxOther.isChecked).toBeTruthy();
    })

    test('Click button submit when there is enough information',async({page})=>{
        const raksulpage = new RaksulPage(page);
        await raksulpage.enterEmail('duy.tran@yopmail.com'); // Input Email
        await raksulpage.enterLastName('Tran');  // Input Last Name
        await raksulpage.enterFirstName('Duy'); // Input First Name
        
        await raksulpage.selectInforSource(); // Choose Infor Source
        await page.keyboard.press('ArrowDown'); 
        await page.keyboard.press('ArrowDown'); // Social Media
        await page.keyboard.press('Enter');

        // Choose Services of Interest
        const checkBoxPrinting =  page.locator('span.ant-checkbox').nth(0);
        await checkBoxPrinting.check();
        const checkBoxLogistics =  page.locator('span.ant-checkbox').nth(1);
        await checkBoxLogistics.check();

        // Choose Type of Association - Other
        const checkBoxOther = page.locator('span.ant-radio input').nth(4);
        await checkBoxOther.check();

        // Click on button submit
        await raksulpage.clickButtonSubmit();
        await expect(page.getByText('Your inquiry has been submitted successfully!')).toBeVisible();


    })


})