import { test, expect } from '@playwright/test';

/**
 * E2E tests for mobile menu interactions
 * _Requirements: 18.3_
 */
test.describe('Mobile Menu', () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE viewport
  });

  test('should open mobile menu when hamburger button is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Click the hamburger menu button
    await page.click('button[aria-label="Open menu"]');
    
    // Verify mobile navigation is visible
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
  });

  test('should close mobile menu when close button is clicked', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
    
    // Close the menu by clicking the close button (X)
    await page.click('button[aria-label="Close"]');
    
    // Verify menu is closed
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).not.toBeVisible();
  });

  test('should navigate to Product page from mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    
    // Click on Product link
    await page.click('nav[aria-label="Mobile navigation"] a:has-text("Product")');
    
    // Verify navigation occurred
    await expect(page).toHaveURL('/product');
  });

  test('should navigate to About page from mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    
    // Click on About Us link
    await page.click('nav[aria-label="Mobile navigation"] a:has-text("About Us")');
    
    // Verify navigation occurred
    await expect(page).toHaveURL('/about');
  });

  test('should navigate to Careers page from mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    
    // Click on Careers link
    await page.click('nav[aria-label="Mobile navigation"] a:has-text("Careers")');
    
    // Verify navigation occurred
    await expect(page).toHaveURL('/careers');
  });

  test('should navigate to Beta page from mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    
    // Click on Join Beta button
    await page.click('nav[aria-label="Mobile navigation"] a:has-text("Join Beta")');
    
    // Verify navigation occurred
    await expect(page).toHaveURL('/beta');
  });

  test('should close menu after navigation', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
    
    // Navigate to a page
    await page.click('nav[aria-label="Mobile navigation"] a:has-text("Product")');
    
    // Wait for navigation
    await expect(page).toHaveURL('/product');
    
    // Menu should be closed after navigation
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).not.toBeVisible();
  });

  test('should show Company section in mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open the menu
    await page.click('button[aria-label="Open menu"]');
    
    // Verify Company section is visible
    await expect(page.locator('nav[aria-label="Mobile navigation"] p:has-text("Company")')).toBeVisible();
    
    // Verify About Us and Careers links are visible under Company
    await expect(page.locator('nav[aria-label="Mobile navigation"] a:has-text("About Us")')).toBeVisible();
    await expect(page.locator('nav[aria-label="Mobile navigation"] a:has-text("Careers")')).toBeVisible();
  });
});
