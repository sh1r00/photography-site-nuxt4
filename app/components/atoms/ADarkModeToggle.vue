<template>
  <button
    type="button"
    :aria-label="isDark ? $t('light_mode') : $t('dark_mode')"
    :title="isDark ? $t('light_mode') : $t('dark_mode')"
    class="p-2 rounded-lg text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
    @click="toggle"
  >
    <AIcon :name="isDark ? 'moon' : 'sun'" size="20" />
  </button>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const { isDark, toggle } = useDarkModeStore()
</script>
