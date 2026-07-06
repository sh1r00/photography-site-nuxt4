import { config } from '@vue/test-utils'
import { vi, beforeEach } from 'vitest'
import { ref } from 'vue'

const cookieStore: Record<string, any> = {}
vi.stubGlobal('useCookie', (key: string, opts?: any) => {
  if (!(key in cookieStore)) {
    const defaultVal = opts?.default ? (typeof opts.default === 'function' ? opts.default() : opts.default) : null
    cookieStore[key] = ref(defaultVal)
  }
  return cookieStore[key]
})

vi.stubGlobal('useHead', vi.fn())
vi.stubGlobal('useSeoMeta', vi.fn())
vi.stubGlobal('useRuntimeConfig', vi.fn(() => ({})))
vi.stubGlobal('navigateTo', vi.fn())
vi.stubGlobal('useRoute', vi.fn(() => ({ path: '/', params: {}, query: {}, fullPath: '/' })))
vi.stubGlobal('useRouter', vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })))
// useLocalePath: called as const localePath = useLocalePath(), then localePath('/some/path')
vi.stubGlobal('useLocalePath', vi.fn(() => (path: string) => path))
vi.stubGlobal('useSwitchLocalePath', vi.fn(() => (path: string) => path))
vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({}))

// Mock useI18n for components that call it in setup
const mockT = vi.fn((key: string) => key)
const mockLocale = ref('EN')
const mockLocales = ref([
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
])
vi.stubGlobal('useI18n', vi.fn(() => ({
  t: mockT,
  locale: mockLocale,
  locales: mockLocales,
})))

config.global.stubs = {
  NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
  ClientOnly: { template: '<div><slot /></div>' },
  AIcon: { template: '<svg :data-name="name"></svg>', props: ['name', 'size'] },
}

// Provide $t for template usage (e.g. $t('key') in templates)
config.global.mocks = {
  $t: (key: string) => key,
}

beforeEach(() => {
  for (const k of Object.keys(cookieStore)) delete cookieStore[k]
})
vi.stubGlobal("import", { meta: { client: true, server: false } })
import { useDarkModeStore } from '~/stores/darkMode'; vi.stubGlobal('useDarkMode', () => useDarkModeStore());
