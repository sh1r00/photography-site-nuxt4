import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import OHeader from '@/components/organisms/OHeader.vue'

describe('OHeader', () => {
  function mountHeader(routePath = '/') {
    // Override useRoute for specific test needs
    ;(globalThis as any).useRoute = vi.fn(() => ({
      path: routePath,
      params: {},
      query: {},
      fullPath: routePath,
    }))

    return mount(OHeader, {
      global: {
        stubs: {
          ADarkModeToggle: { template: '<button data-testid="dark-mode-toggle" />' },
        },
      },
    })
  }

  it('renders the header element', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('renders the logo with "LENS" text', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toContain('LENS')
  })

  it('renders a camera icon in the logo area', () => {
    const wrapper = mountHeader()
    const icons = wrapper.findAll('svg')
    const cameraIcon = icons.find((svg) => svg.attributes('data-name') === 'camera')
    expect(cameraIcon).toBeTruthy()
  })

  it('renders navigation links', () => {
    const wrapper = mountHeader()
    const links = wrapper.findAll('a')
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/blogs')
    expect(hrefs).toContain('/contact')
    expect(hrefs).toContain('/faqs')
  })

  it('renders the dark mode toggle', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('[data-testid="dark-mode-toggle"]').exists()).toBe(true)
  })

  it('renders locale switcher with globe icon', () => {
    const wrapper = mountHeader()
    const icons = wrapper.findAll('svg')
    const globeIcon = icons.find((svg) => svg.attributes('data-name') === 'globe')
    expect(globeIcon).toBeTruthy()
  })

  it('displays current locale code', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toContain('EN')
  })

  it('mobile menu is hidden by default', () => {
    const wrapper = mountHeader()
    // The mobile menu has a div with v-if that should not render when mobileMenuOpen is false
    // Look for links that only appear in the mobile menu (wider padding, block display)
    const bodyText = wrapper.text()
    // The desktop links are in a hidden div (hidden md:flex), mobile links in md:hidden
    // Both should render since Vue's Transition handles v-if, but mobileMenuOpen=false
    // means the mobile-specific divs aren't there
    // We can verify the aria-expanded attribute on the mobile button
    const mobileBtn = wrapper.find('button[aria-expanded]')
    expect(mobileBtn.exists()).toBe(true)
    expect(mobileBtn.attributes('aria-expanded')).toBe('false')
  })

  it('opens mobile menu when hamburger is clicked', async () => {
    const wrapper = mountHeader()
    const mobileBtn = wrapper.find('button[aria-expanded]')
    await mobileBtn.trigger('click')
    expect(mobileBtn.attributes('aria-expanded')).toBe('true')
    // Icon should change to close
    const icon = mobileBtn.find('svg')
    expect(icon.attributes('data-name')).toBe('close')
  })

  it('highlights active nav link based on current route', () => {
    const wrapper = mountHeader('/about')
    const links = wrapper.findAll('a')
    const aboutLink = links.find((l) => l.attributes('href') === '/about')
    expect(aboutLink).toBeTruthy()
    if (aboutLink) {
      expect(aboutLink.classes()).toContain('text-gold-400')
    }
  })
})
