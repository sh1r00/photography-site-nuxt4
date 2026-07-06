<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-20 animate-fade-in-up">
      <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">{{ $t('about_title') }}</h1>
      <p class="text-charcoal-400 text-xl">{{ $t('about_subtitle') }}</p>
    </div>

    <!-- Bio Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
      <div class="aspect-[3/4] rounded-2xl bg-gradient-to-br from-charcoal-700 to-charcoal-800 flex items-center justify-center animate-fade-in-up">
        <AIcon name="camera" size="80" class="text-charcoal-600" />
      </div>

      <div class="animate-fade-in-up" style="animation-delay: 0.15s">
        <h2 class="text-2xl font-bold text-gold-400 mb-6">{{ $t('about_bio_title') }}</h2>
        <div class="space-y-4 text-charcoal-300 leading-relaxed">
          <p>{{ $t('about_bio_p1') }}</p>
          <p>{{ $t('about_bio_p2') }}</p>
          <p>{{ $t('about_bio_p3') }}</p>
        </div>
      </div>
    </div>

    <!-- Philosophy -->
    <div class="mb-20">
      <h2 class="text-2xl font-bold text-gold-400 mb-10 text-center">{{ $t('about_philosophy_title') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in philosophyItems"
          :key="index"
          class="p-6 rounded-xl bg-charcoal-800/30 border border-charcoal-800 text-center animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
            <span class="text-gold-400 font-bold text-lg">{{ index + 1 }}</span>
          </div>
          <p class="text-charcoal-300 leading-relaxed">{{ item }}</p>
        </div>
      </div>
    </div>

    <!-- Gear -->
    <div>
      <h2 class="text-2xl font-bold text-gold-400 mb-10 text-center">{{ $t('about_gear_title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Camera Bodies -->
        <div class="p-6 rounded-2xl bg-charcoal-800/30 border border-charcoal-800">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AIcon name="camera" size="20" class="text-gold-400" />
            Camera Bodies
          </h3>
          <ul class="space-y-2 text-charcoal-300">
            <li v-for="item in gearBodies" :key="item" class="flex items-center gap-2">
              <AIcon name="check" size="16" class="text-gold-400 flex-shrink-0" />
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Lenses & Lighting -->
        <div class="p-6 rounded-2xl bg-charcoal-800/30 border border-charcoal-800">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AIcon name="settings" size="20" class="text-gold-400" />
            Lenses & Lighting
          </h3>
          <ul class="space-y-2 text-charcoal-300">
            <li v-for="item in gearLenses" :key="item" class="flex items-center gap-2">
              <AIcon name="check" size="16" class="text-gold-400 flex-shrink-0" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const philosophyItems = computed(() => [
  t('about_philosophy_1'),
  t('about_philosophy_2'),
  t('about_philosophy_3'),
  t('about_philosophy_4'),
])

const gearBodies = computed(() => [
  t('about_gear_body_1'),
  t('about_gear_body_2'),
])

const gearLenses = computed(() => [
  t('about_gear_lens_1'),
  t('about_gear_lens_2'),
  t('about_gear_lens_3'),
  t('about_gear_lens_4'),
  t('about_gear_lighting'),
])

useHead({
  title: 'About — LENS Photography',
})
</script>
