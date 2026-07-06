<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal-950/60 via-charcoal-950/40 to-charcoal-950 z-10" />

      <!-- Hero content -->
      <div class="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-balance animate-fade-in-up">
          {{ $t('hero_title') }}
        </h1>
        <p class="text-lg sm:text-xl text-charcoal-300 mb-10 max-w-2xl mx-auto animate-fade-in-up" style="animation-delay: 0.15s">
          {{ $t('hero_subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 0.3s">
          <ABaseButton variant="primary" size="lg" :to="localePath('/contact')">
            {{ $t('hero_cta') }}
          </ABaseButton>
          <ABaseButton variant="outline" size="lg" @click="scrollToPortfolio">
            {{ $t('hero_contact') }}
          </ABaseButton>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <AIcon name="chevron-down" size="32" class="text-gold-400" />
        </div>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section id="portfolio" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ $t('portfolio_title') }}</h2>
        <p class="text-charcoal-400 text-lg">{{ $t('portfolio_subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in portfolioItems"
          :key="index"
          class="group relative aspect-[4/5] rounded-xl overflow-hidden bg-charcoal-800 animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="w-full h-full bg-gradient-to-br from-charcoal-700 to-charcoal-800 flex items-center justify-center">
            <AIcon name="image" size="48" class="text-charcoal-600 group-hover:text-gold-400/30 transition-colors" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div>
              <p class="text-white font-semibold text-lg">{{ item.title }}</p>
              <p class="text-gold-400 text-sm">{{ item.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-20 bg-charcoal-900/50">
      <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ $t('services_title') }}</h2>
          <p class="text-charcoal-400 text-lg">{{ $t('services_subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="group p-8 rounded-2xl bg-charcoal-800/50 border border-charcoal-700 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
              <AIcon :name="service.icon" size="28" class="text-gold-400" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ service.title }}</h3>
            <p class="text-charcoal-400 leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ $t('testimonials_title') }}</h2>
        <p class="text-charcoal-400 text-lg">{{ $t('testimonials_subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="p-8 rounded-2xl bg-charcoal-800/30 border border-charcoal-800 animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <AIcon name="quote" size="32" class="text-gold-400/30 mb-4" />
          <p class="text-charcoal-300 leading-relaxed mb-6 italic">"{{ testimonial.text }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <AIcon name="user" size="18" class="text-charcoal-950" />
            </div>
            <div>
              <p class="text-white font-medium text-sm">{{ testimonial.name }}</p>
              <p class="text-charcoal-500 text-xs">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Instagram Feed Placeholder -->
    <section class="py-20 bg-charcoal-900/50">
      <div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">{{ $t('instagram_title') }}</h2>
          <p class="text-charcoal-400 text-lg">{{ $t('instagram_subtitle') }}</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="n in 6"
            :key="n"
            class="aspect-square rounded-xl bg-charcoal-800 flex items-center justify-center group cursor-pointer hover:ring-2 hover:ring-gold-400/50 transition-all"
          >
            <AIcon name="instagram" size="32" class="text-charcoal-600 group-hover:text-gold-400/30 transition-colors" />
          </div>
        </div>

        <div class="text-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors font-medium"
          >
            @lens.photography
            <AIcon name="external-link" size="16" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const portfolioItems = computed(() => [
  { title: 'Golden Hour Embrace', category: 'Weddings' },
  { title: 'Urban Portraits', category: 'Portraits' },
  { title: 'Product Elegance', category: 'Commercial' },
  { title: 'Mountain Elopement', category: 'Weddings' },
  { title: 'Family Joy', category: 'Portraits' },
  { title: 'Architecture in Light', category: 'Commercial' },
])

const services = computed(() => [
  { icon: 'heart', title: t('service_weddings_title'), description: t('service_weddings_desc') },
  { icon: 'user', title: t('service_portraits_title'), description: t('service_portraits_desc') },
  { icon: 'award', title: t('service_commercial_title'), description: t('service_commercial_desc') },
])

const testimonials = computed(() => [
  { text: t('testimonial_1_text'), name: t('testimonial_1_name'), role: t('testimonial_1_role') },
  { text: t('testimonial_2_text'), name: t('testimonial_2_name'), role: t('testimonial_2_role') },
  { text: t('testimonial_3_text'), name: t('testimonial_3_name'), role: t('testimonial_3_role') },
])

function scrollToPortfolio() {
  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
}

useHead({
  title: 'LENS — Photography Portfolio',
  meta: [
    { name: 'description', content: 'Professional photography portfolio showcasing weddings, portraits, and commercial work.' },
  ],
})
</script>
