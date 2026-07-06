<template>
  <footer class="bg-charcoal-900 border-t border-charcoal-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <AIcon name="camera" size="24" class="text-gold-400" />
            <span class="text-lg font-bold text-gold-400">LENS</span>
          </div>
          <p class="text-charcoal-400 text-sm leading-relaxed">
            {{ $t('site_description') }}
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal-200 uppercase tracking-wider mb-4">
            {{ $t('nav_home') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.to">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-sm text-charcoal-400 hover:text-gold-400 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Social & Contact -->
        <div>
          <h3 class="text-sm font-semibold text-charcoal-200 uppercase tracking-wider mb-4">
            {{ $t('contact_social_title') }}
          </h3>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-lg text-charcoal-400 hover:text-gold-400 hover:bg-charcoal-800 transition-colors"
            >
              <AIcon :name="social.icon" size="20" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-10 pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-charcoal-500">
          &copy; {{ new Date().getFullYear() }} LENS Photography. {{ $t('footer_rights') }}
        </p>
        <div class="flex gap-6">
          <NuxtLink
            :to="localePath('/page/privacy')"
            class="text-sm text-charcoal-500 hover:text-gold-400 transition-colors"
          >
            {{ $t('footer_privacy') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/page/terms')"
            class="text-sm text-charcoal-500 hover:text-gold-400 transition-colors"
          >
            {{ $t('footer_terms') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()

const footerLinks = computed(() => [
  { to: '/', label: t('nav_home') },
  { to: '/about', label: t('nav_about') },
  { to: '/blogs', label: t('nav_blogs') },
  { to: '/contact', label: t('nav_contact') },
  { to: '/faqs', label: t('nav_faqs') },
])

const socialLinks = [
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
  { name: 'Email', icon: 'mail', url: 'mailto:hello@lensphoto.com' },
]
</script>
