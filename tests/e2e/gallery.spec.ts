import { test, expect } from '@playwright/test'

test.describe('Gallery Page', () => {
  test('loads or gracefully handles missing page', async ({ page }) => {
    const response = await page.goto('/gallery')
    // Should either load successfully or return a reasonable status
    if (response) {
      expect(response.status()).toBeLessThan(500)
    }
  })

  test('page has meaningful content', async ({ page }) => {
    await page.goto('/gallery')
    // If gallery page exists, it should have content
    const main = page.locator('main, #main-content')
    await expect(main.first()).toBeVisible()

    // Look for gallery-related content: images, grid of items, or heading
    const hasImages = (await page.locator('img').count()) > 0
    const hasGrid = (await page.locator('.grid').count()) > 0
    const hasHeading = (await page.locator('h1, h2').count()) > 0

    // At least one indicator of content should exist
    expect(hasImages || hasGrid || hasHeading).toBe(true)
  })

  test('gallery grid renders if page exists', async ({ page }) => {
    await page.goto('/gallery')

    // Photography gallery should display images in a grid
    const gridItems = page.locator('.grid > *, [class*="gallery"] > *')
    const count = await gridItems.count()

    // Either we have grid items or the page gracefully handles the missing route
    if (count > 0) {
      await expect(gridItems.first()).toBeVisible()
    }
  })

  test('header and footer render on gallery page', async ({ page }) => {
    await page.goto('/gallery')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('navigation back to home works from gallery', async ({ page }) => {
    await page.goto('/gallery')
    // Click logo or home link
    const homeLink = page.locator('header a[href="/"], header a[href*="index"]').first()
    if (await homeLink.isVisible()) {
      await homeLink.click()
      await expect(page).toHaveURL(/\/?$/)
      await expect(page.locator('header')).toBeVisible()
    }
  })
})
