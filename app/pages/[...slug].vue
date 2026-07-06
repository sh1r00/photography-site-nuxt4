<template>
  <div class="min-h-[60vh] flex items-center justify-center py-20 px-4">
    <div class="text-center max-w-md animate-fade-in-up">
      <div class="text-8xl font-bold text-gold-400 mb-6">404</div>
      <h1 class="text-3xl font-bold text-white mb-4">{{ $t('page_not_found_title') }}</h1>
      <p class="text-charcoal-400 mb-8 leading-relaxed">
        {{ $t('page_not_found_message') }}
      </p>
      <ABaseButton variant="primary" size="lg" :to="localePath('/')">
        <template #default>{{ $t('page_not_found_cta') }}</template>
      </ABaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

useHead({
  title: '404 — Page Not Found',
})
</script>
