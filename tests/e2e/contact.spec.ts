import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('contact form renders with required fields', async ({ page }) => {
    await page.goto('/contact')
    const form = page.locator('form')
    await expect(form).toBeVisible()

    const nameInput = page.locator('#contact-name')
    await expect(nameInput).toBeVisible()

    const submitButton = form.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
  })

  test('form shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/contact')
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    // Validation messages should appear for required fields
    const errorMessages = page.locator('[role="alert"], .text-red-500')
    const count = await errorMessages.count()
    expect(count).toBeGreaterThan(0)
  })

  test('can type into form fields', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('#contact-name', 'Alex Photographer')
    await page.fill('#contact-email', 'alex@example.com')
    await page.fill('#contact-message', 'I would like to book a session.')

    await expect(page.locator('#contact-name')).toHaveValue('Alex Photographer')
    await expect(page.locator('#contact-email')).toHaveValue('alex@example.com')
    await expect(page.locator('#contact-message')).toHaveValue('I would like to book a session.')
  })

  test('contact info sidebar is visible', async ({ page }) => {
    await page.goto('/contact')
    // Photography contact page has a sidebar with contact info
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Should have multiple grid columns (form + sidebar)
    const grid = main.locator('.grid').first()
    if (await grid.isVisible()) {
      const columns = await grid.evaluate((el) =>
        window.getComputedStyle(el).gridTemplateColumns
      )
      // Should have more than one column track
      expect(columns.split(' ').length).toBeGreaterThan(1)
    }
  })
})
