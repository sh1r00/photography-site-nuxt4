import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import ADarkModeToggle from '@/components/atoms/ADarkModeToggle.vue'

// useDarkModeStore is stubbed globally in setup.ts, but we override it
// with a controllable version that uses real Vue refs
const mockIsDark = ref(true)
const mockToggle = vi.fn()
const mockApplyTheme = vi.fn()

vi.stubGlobal('useDarkModeStore', vi.fn(() => ({
  isDark: mockIsDark,
  toggle: mockToggle,
  applyTheme: mockApplyTheme,
})))

describe('ADarkModeToggle', () => {
  beforeEach(() => {
    mockIsDark.value = true
    mockToggle.mockClear()
    mockApplyTheme.mockClear()
  })

  it('renders a button', () => {
    const wrapper = mount(ADarkModeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows moon icon when isDark is true', () => {
    mockIsDark.value = true
    const wrapper = mount(ADarkModeToggle)
    const icon = wrapper.find('svg')
    expect(icon.attributes('data-name')).toBe('moon')
  })

  it('shows sun icon when isDark is false', () => {
    mockIsDark.value = false
    const wrapper = mount(ADarkModeToggle)
    const icon = wrapper.find('svg')
    expect(icon.attributes('data-name')).toBe('sun')
  })

  it('calls toggle on click', async () => {
    const wrapper = mount(ADarkModeToggle)
    await wrapper.find('button').trigger('click')
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('has correct aria-label for dark mode', () => {
    mockIsDark.value = true
    const wrapper = mount(ADarkModeToggle)
    const btn = wrapper.find('button')
    expect(btn.attributes('aria-label')).toBe('light_mode')
    expect(btn.attributes('title')).toBe('light_mode')
  })

  it('has correct aria-label for light mode', () => {
    mockIsDark.value = false
    const wrapper = mount(ADarkModeToggle)
    const btn = wrapper.find('button')
    expect(btn.attributes('aria-label')).toBe('dark_mode')
    expect(btn.attributes('title')).toBe('dark_mode')
  })
})
