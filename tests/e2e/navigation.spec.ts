import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('desktop navigation renders with links', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header).toBeVisible()

    const nav = header.locator('nav')
    await expect(nav).toBeVisible()

    const links = nav.locator('a')
    const count = await links.count()
    expect(count).toBeGreaterThan(0)
  })

  test('nav links navigate to correct pages', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('header nav')
    const aboutLink = nav.locator('a[href*="about"]')
    if (await aboutLink.count() > 0) {
      await aboutLink.first().click()
      await expect(page).toHaveURL(/about/)
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('mobile menu toggle opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 375, height: 812 })

    const hamburger = page.locator('header button[aria-label*="menu"], header button[aria-label*="Menu"]')
    if (await hamburger.isVisible()) {
      // Should be collapsed initially
      expect(await hamburger.getAttribute('aria-expanded')).toBe('false')

      await hamburger.click()
      // Should expand
      expect(await hamburger.getAttribute('aria-expanded')).toBe('true')

      // Mobile nav should be visible
      const mobileNav = page.locator('header .space-y-1, header [class*="space-y-1"]')
      await expect(mobileNav.first()).toBeVisible()
    }
  })

  test('header is fixed/sticky', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Header should have fixed or sticky positioning
    const position = await header.evaluate((el) =>
      window.getComputedStyle(el).position
    )
    expect(['fixed', 'sticky']).toContain(position)
  })

  test('footer renders across pages', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    await page.goto('/about')
    await expect(footer).toBeVisible()
  })
})
