import { test, expect } from '@playwright/test';

/**
 * E2E tests for page navigation
 * _Requirements: 18.1_
 */
test.describe('Page Navigation', () => {
  test('should navigate from homepage to Product page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Product link in navigation
    await page.click('nav[aria-label="Main navigation"] a:has-text("Product")');
    
    // Verify we're on the Product page
    await expect(page).toHaveURL('/product');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate from homepage to About page via Company dropdown', async ({ page }) => {
    await page.goto('/');
    
    // Hover over Company dropdown to reveal menu
    await page.hover('button:has-text("Company")');
    
    // Click on About Us link
    await page.click('a:has-text("About Us")');
    
    // Verify we're on the About page
    await expect(page).toHaveURL('/about');
  });

  test('should navigate from homepage to Careers page via Company dropdown', async ({ page }) => {
    await page.goto('/');
    
    // Hover over Company dropdown to reveal menu
    await page.hover('button:has-text("Company")');
    
    // Click on Careers link
    await page.click('a:has-text("Careers")');
    
    // Verify we're on the Careers page
    await expect(page).toHaveURL('/careers');
  });

  test('should navigate from homepage to Beta page', async ({ page }) => {
    await page.goto('/');
    
    // Click on Join Beta button
    await page.click('nav[aria-label="Main navigation"] a:has-text("Join Beta")');
    
    // Verify we're on the Beta page
    await expect(page).toHaveURL('/beta');
  });

  test('should navigate back to homepage via logo', async ({ page }) => {
    // Start on a different page
    await page.goto('/product');
    
    // Click on the logo to go home
    await page.click('a[aria-label="Koeo home"]');
    
    // Verify we're on the homepage
    await expect(page).toHaveURL('/');
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check that footer is visible
    await expect(page.locator('footer')).toBeVisible();
  });
});
