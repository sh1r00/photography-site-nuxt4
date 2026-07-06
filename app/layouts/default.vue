<template>
  <div>
    <NuxtRouteAnnouncer />
    <a href="#main-content" class="skip-to-content">{{ $t('skip_to_content') }}</a>

    <OHeader />

    <main id="main-content" class="min-h-screen pt-16">
      <slot />
    </main>

    <OFooter />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({
  htmlAttrs: { class: 'dark' },
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
