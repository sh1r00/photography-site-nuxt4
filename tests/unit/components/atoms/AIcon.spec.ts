import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AIcon from '@/components/atoms/AIcon.vue'

describe('AIcon', () => {
  it('renders an svg element', () => {
    const wrapper = mount(AIcon, { props: { name: 'camera' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('sets width and height from size prop', () => {
    const wrapper = mount(AIcon, { props: { name: 'camera', size: '32' } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('32')
    expect(svg.attributes('height')).toBe('32')
  })

  it('defaults size to "24"', () => {
    const wrapper = mount(AIcon, { props: { name: 'camera' } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('24')
    expect(svg.attributes('height')).toBe('24')
  })

  it('applies className prop', () => {
    const wrapper = mount(AIcon, { props: { name: 'camera', className: 'text-gold-400' } })
    const svg = wrapper.find('svg')
    expect(svg.classes()).toContain('text-gold-400')
  })

  it('is aria-hidden by default (no ariaLabel)', () => {
    const wrapper = mount(AIcon, { props: { name: 'camera' } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('aria-hidden')).toBe('true')
  })

  it('sets aria-label and role when ariaLabel is provided', () => {
    const wrapper = mount(AIcon, { props: { name: 'camera', ariaLabel: 'Camera icon' } })
    const svg = wrapper.find('svg')
    expect(svg.attributes('aria-label')).toBe('Camera icon')
    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-hidden')).toBeUndefined()
  })

  // Test specific icon names
  const iconNames = [
    'camera', 'menu', 'close', 'sun', 'moon', 'heart', 'star',
    'mail', 'phone', 'map-pin', 'instagram', 'arrow-right', 'arrow-left',
    'chevron-down', 'chevron-up', 'check', 'external-link', 'send',
    'user', 'search', 'quote', 'calendar', 'clock', 'globe', 'image',
    'award', 'settings',
  ]

  iconNames.forEach((name) => {
    it(`renders "${name}" icon without error`, () => {
      const wrapper = mount(AIcon, { props: { name } })
      expect(wrapper.find('svg').exists()).toBe(true)
    })
  })
})
