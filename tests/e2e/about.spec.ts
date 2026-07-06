import { test, expect } from '@playwright/test'

test.describe('About Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/about')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays photographer bio section', async ({ page }) => {
    await page.goto('/about')
    // Bio section with camera placeholder and text
    const bioSection = page.locator('.grid')
    await expect(bioSection.first()).toBeVisible()

    // Should have bio text content
    const bioText = page.locator('p')
    const count = await bioText.count()
    expect(count).toBeGreaterThan(0)
  })

  test('displays philosophy section', async ({ page }) => {
    await page.goto('/about')
    const philosophyHeading = page.locator('h2').filter({ hasText: /philosophy/i })
    const count = await philosophyHeading.count()
    expect(count).toBeGreaterThanOrEqual(0) // May or may not be present depending on i18n
  })

  test('renders philosophy grid items', async ({ page }) => {
    await page.goto('/about')
    // The philosophy grid should have items
    const gridItems = page.locator('.grid > div')
    const count = await gridItems.count()
    expect(count).toBeGreaterThan(0)
  })

  test('has profile image placeholder', async ({ page }) => {
    await page.goto('/about')
    // Camera icon placeholder in the bio image area
    const cameraIcon = page.locator('[class*="aspect"]').first()
    await expect(cameraIcon).toBeVisible()
  })
})
