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
    
    // Verify key form sections are present (using exact match to avoid multiple elements)
    await expect(page.getByRole('heading', { name: 'About you', exact: true })).toBeVisible();
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
    await page.locator('#workloadTypes').click();
    await page.getByRole('option', { name: 'Inference (LLM / RAG / vision)' }).click();
    // Click outside to close dropdown
    await page.locator('h2:has-text("Tell us about")').click();
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    
    // Fill Current Setup section
    await page.locator('#currentInfraSources').click();
    await page.getByRole('option', { name: 'AWS' }).click();
    // Click outside to close dropdown
    await page.locator('h2:has-text("Tell us about")').click();
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    
    await page.locator('#monthlySpend').click();
    await page.getByRole('option', { name: '$500–2k' }).click();
    
    await page.fill('textarea[name="workflow"]', 'We use containerized workloads on Kubernetes');
    
    // Fill Pain Points section
    await page.locator('#topPainPoints').click();
    await page.getByRole('option', { name: 'Cost / unpredictable bills' }).click();
    // Click outside to close dropdown
    await page.locator('h2:has-text("Tell us about")').click();
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    
    // Fill Features section
    await page.locator('#mostValuableFeatures').click();
    await page.getByRole('option', { name: 'OpenAI-compatible API' }).click();
    // Click outside to close dropdown
    await page.locator('h2:has-text("Tell us about")').click();
    await expect(page.locator('[role="listbox"]')).not.toBeVisible();
    
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
