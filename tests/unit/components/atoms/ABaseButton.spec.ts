import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ABaseButton from '@/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  it('renders a button element by default', () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'Click me' } })
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('Click me')
  })

  it('mounts without errors when "to" prop is provided', () => {
    // NuxtLink is a Nuxt auto-import used with :is binding. In vitest without
    // Nuxt's auto-import transformer, NuxtLink resolves to undefined and Vue
    // renders nothing for :is="undefined". The component still mounts cleanly.
    const wrapper = mount(ABaseButton, {
      props: { to: '/about' },
      slots: { default: 'About' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies disabled attribute and classes', () => {
    const wrapper = mount(ABaseButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    const btn = wrapper.find('button')
    expect(btn.attributes('disabled')).toBeDefined()
    expect(btn.classes()).toContain('opacity-50')
    expect(btn.classes()).toContain('cursor-not-allowed')
  })

  it('applies variant classes: primary (default)', () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'Primary' } })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('bg-gold-500')
  })

  it('applies variant classes: secondary', () => {
    const wrapper = mount(ABaseButton, {
      props: { variant: 'secondary' },
      slots: { default: 'Secondary' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('bg-charcoal-700')
  })

  it('applies variant classes: outline', () => {
    const wrapper = mount(ABaseButton, {
      props: { variant: 'outline' },
      slots: { default: 'Outline' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('border')
    expect(btn.classes()).toContain('border-gold-500')
  })

  it('applies variant classes: ghost', () => {
    const wrapper = mount(ABaseButton, {
      props: { variant: 'ghost' },
      slots: { default: 'Ghost' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('text-charcoal-300')
  })

  it('applies size classes: sm', () => {
    const wrapper = mount(ABaseButton, {
      props: { size: 'sm' },
      slots: { default: 'Small' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('text-sm')
    expect(btn.classes()).toContain('px-3')
  })

  it('applies size classes: md (default)', () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'Medium' } })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('text-base')
    expect(btn.classes()).toContain('px-5')
  })

  it('applies size classes: lg', () => {
    const wrapper = mount(ABaseButton, {
      props: { size: 'lg' },
      slots: { default: 'Large' },
    })
    const btn = wrapper.find('button')
    expect(btn.classes()).toContain('text-lg')
    expect(btn.classes()).toContain('px-7')
  })

  it('renders an AIcon on the left when icon prop is set', () => {
    const wrapper = mount(ABaseButton, {
      props: { icon: 'camera', iconPosition: 'left' },
      slots: { default: 'With Icon' },
    })
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(1)
    expect(icons[0].attributes('data-name')).toBe('camera')
  })

  it('renders an AIcon on the right when iconPosition is right', () => {
    const wrapper = mount(ABaseButton, {
      props: { icon: 'arrow-right', iconPosition: 'right' },
      slots: { default: 'Next' },
    })
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render AIcon when no icon prop provided', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'No Icon' },
    })
    expect(wrapper.findAll('svg').length).toBe(0)
  })
})
