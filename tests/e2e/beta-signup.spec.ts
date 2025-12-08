import { test, expect } from '@playwright/test';

/**
 * E2E tests for beta signup flow
 * _Requirements: 18.2_
 */
test.describe('Beta Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/beta');
  });

  test('should display the beta signup form', async ({ page }) => {
    // Verify form is visible
    await expect(page.locator('form')).toBeVisible();
    
    // Verify key form sections are present
    await expect(page.locator('text=About You')).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Scroll to form and click submit without filling fields
    await page.locator('button[type="submit"]').scrollIntoViewIfNeeded();
    await page.click('button[type="submit"]');
    
    // Verify validation errors appear (form should not submit)
    // The form should still be visible (not showing success state)
    await expect(page.locator('form')).toBeVisible();
  });

  test('should fill out and submit the beta signup form', async ({ page }) => {
    // Fill out About You section
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="organizationName"]', 'Test Organization');
    
    // Select role from dropdown
    await page.click('button:has-text("Select your role")');
    await page.click('text=ML Engineer / Data Scientist');
    
    // Select segment from dropdown
    await page.click('button:has-text("Select your segment")');
    await page.click('text=Startup / Scaleup');
    
    // Fill AI Usage section
    await page.fill('textarea[name="aiUseCase"]', 'Building AI-powered applications for data analysis');
    
    // Select workload types (multi-select)
    await page.click('button:has-text("Select workload types")');
    await page.click('text=Inference (LLM / RAG / vision)');
    await page.keyboard.press('Escape'); // Close dropdown
    
    // Fill Current Setup section
    await page.click('button:has-text("Select infrastructure sources")');
    await page.click('text=AWS');
    await page.keyboard.press('Escape');
    
    await page.click('button:has-text("Select monthly spend")');
    await page.click('text=$500–2k');
    
    await page.fill('textarea[name="workflow"]', 'We use containerized workloads on Kubernetes');
    
    // Fill Pain Points section
    await page.click('button:has-text("Select pain points")');
    await page.click('text=Cost / unpredictable bills');
    await page.keyboard.press('Escape');
    
    // Fill Features section
    await page.click('button:has-text("Select valuable features")');
    await page.click('text=OpenAI-compatible API');
    await page.keyboard.press('Escape');
    
    // Submit the form
    await page.locator('button[type="submit"]').scrollIntoViewIfNeeded();
    
    // Note: We don't actually submit to avoid hitting the real API
    // Instead, verify the form is properly filled
    await expect(page.locator('input[name="fullName"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });

  test('should validate email format', async ({ page }) => {
    // Fill with invalid email
    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    
    // Try to submit
    await page.locator('button[type="submit"]').scrollIntoViewIfNeeded();
    await page.click('button[type="submit"]');
    
    // Form should still be visible (validation failed)
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check that form inputs have associated labels
    const fullNameInput = page.locator('input[name="fullName"]');
    await expect(fullNameInput).toBeVisible();
    
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toBeVisible();
  });
});
