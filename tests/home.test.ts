import "dotenv/config";
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', async () => {
    test.beforeEach('Access To Home Page', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.visitPage();
    });
    
    test('View Homepage', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.clickCloseButton();
    })
})
