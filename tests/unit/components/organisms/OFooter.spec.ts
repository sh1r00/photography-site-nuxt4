import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OFooter from '@/components/organisms/OFooter.vue'

describe('OFooter', () => {
  function mountFooter() {
    return mount(OFooter)
  }

  it('renders the footer element', () => {
    const wrapper = mountFooter()
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('renders the LENS brand name and camera icon', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('LENS')
    const icons = wrapper.findAll('svg')
    const cameraIcon = icons.find((svg) => svg.attributes('data-name') === 'camera')
    expect(cameraIcon).toBeTruthy()
  })

  it('renders the site description', () => {
    const wrapper = mountFooter()
    // $t('site_description') returns 'site_description' (stubbed t function)
    expect(wrapper.text()).toContain('site_description')
  })

  it('renders quick links section', () => {
    const wrapper = mountFooter()
    const links = wrapper.findAll('a')
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/about')
    expect(hrefs).toContain('/blogs')
    expect(hrefs).toContain('/contact')
    expect(hrefs).toContain('/faqs')
  })

  it('renders social links (Instagram and Email)', () => {
    const wrapper = mountFooter()
    const allLinks = wrapper.findAll('a')
    const socialLinks = allLinks.filter((l) => {
      const href = l.attributes('href')
      return href && (href.includes('instagram.com') || href.includes('mailto:'))
    })
    expect(socialLinks.length).toBe(2)

    const hrefs = socialLinks.map((l) => l.attributes('href'))
    expect(hrefs).toContain('https://instagram.com')
    expect(hrefs).toContain('mailto:hello@lensphoto.com')
  })

  it('renders social icons', () => {
    const wrapper = mountFooter()
    const icons = wrapper.findAll('svg')
    const instagramIcon = icons.find((svg) => svg.attributes('data-name') === 'instagram')
    const mailIcon = icons.find((svg) => svg.attributes('data-name') === 'mail')
    expect(instagramIcon).toBeTruthy()
    expect(mailIcon).toBeTruthy()
  })

  it('renders copyright with current year', () => {
    const wrapper = mountFooter()
    const currentYear = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(currentYear)
    expect(wrapper.text()).toContain('LENS Photography')
  })

  it('renders privacy and terms links in bottom bar', () => {
    const wrapper = mountFooter()
    const links = wrapper.findAll('a')
    const privacyLink = links.find((l) => l.attributes('href') === '/page/privacy')
    const termsLink = links.find((l) => l.attributes('href') === '/page/terms')
    expect(privacyLink).toBeTruthy()
    expect(termsLink).toBeTruthy()
  })

  it('renders footer rights text', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('footer_rights')
  })

  it('renders footer privacy and terms text', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('footer_privacy')
    expect(wrapper.text()).toContain('footer_terms')
  })
})
