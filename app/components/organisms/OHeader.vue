<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-800">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
          aria-label="LENS Photography Home"
        >
          <AIcon name="camera" size="28" />
          <span class="text-xl font-bold tracking-tight">LENS</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            class="px-3 py-2 rounded-lg text-sm font-medium text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 transition-colors"
            :class="{ 'text-gold-400 bg-charcoal-800/50': isActive(link.to) }"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-2">
          <!-- Locale switcher -->
          <div class="relative" @mouseenter="showLocales = true" @mouseleave="showLocales = false">
            <button
              type="button"
              class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 transition-colors"
              aria-label="Switch language"
            >
              <AIcon name="globe" size="16" />
              <span class="uppercase">{{ currentLocale }}</span>
              <AIcon name="chevron-down" size="14" />
            </button>
            <Transition name="slide-down">
              <div
                v-if="showLocales"
                class="absolute right-0 mt-1 py-2 w-36 bg-charcoal-800 border border-charcoal-700 rounded-lg shadow-xl"
              >
                <NuxtLink
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  :to="switchLocalePath(locale.code)"
                  class="block px-4 py-2 text-sm text-charcoal-200 hover:text-gold-400 hover:bg-charcoal-700 transition-colors"
                  @click="showLocales = false"
                >
                  {{ locale.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Dark mode toggle -->
          <ADarkModeToggle />

          <!-- Mobile menu button -->
          <button
            type="button"
            class="md:hidden p-2 rounded-lg text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 transition-colors"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <AIcon :name="mobileMenuOpen ? 'close' : 'menu'" size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden border-t border-charcoal-800 py-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 transition-colors"
            :class="{ 'text-gold-400 bg-charcoal-800/50': isActive(link.to) }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const mobileMenuOpen = ref(false)
const showLocales = ref(false)

const { locale, locales } = useI18n()
const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const navLinks = computed(() => [
  { to: '/', label: t('nav_home') },
  { to: '/about', label: t('nav_about') },
  { to: '/blogs', label: t('nav_blogs') },
  { to: '/contact', label: t('nav_contact') },
  { to: '/faqs', label: t('nav_faqs') },
])

function isActive(path: string) {
  if (path === '/') return route.path === '/' || route.path === ''
  return route.path.startsWith(path)
}
</script>
