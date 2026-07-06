<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16 animate-fade-in-up">
      <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">{{ $t('faqs_title') }}</h1>
      <p class="text-charcoal-400 text-xl">{{ $t('faqs_subtitle') }}</p>
    </div>

    <!-- FAQ Accordion -->
    <div class="space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="rounded-xl bg-charcoal-800/30 border border-charcoal-800 overflow-hidden animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.08}s` }"
      >
        <button
          :id="`faq-trigger-${index}`"
          type="button"
          :aria-expanded="openIndex === index ? 'true' : 'false'"
          :aria-controls="`faq-panel-${index}`"
          class="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-charcoal-800/50"
          @click="toggleFaq(index)"
        >
          <span class="text-white font-medium pr-4">{{ faq.question }}</span>
          <AIcon
            :name="openIndex === index ? 'chevron-up' : 'chevron-down'"
            size="20"
            class="text-gold-400 flex-shrink-0 transition-transform duration-200"
          />
        </button>

        <Transition name="slide-down">
          <div
            v-if="openIndex === index"
            :id="`faq-panel-${index}`"
            role="region"
            :aria-labelledby="`faq-trigger-${index}`"
            class="px-6 pb-5"
          >
            <p class="text-charcoal-400 leading-relaxed">{{ faq.answer }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const openIndex = ref<number | null>(null)

function toggleFaq(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = computed(() => [
  { question: t('faq_q1'), answer: t('faq_a1') },
  { question: t('faq_q2'), answer: t('faq_a2') },
  { question: t('faq_q3'), answer: t('faq_a3') },
  { question: t('faq_q4'), answer: t('faq_a4') },
  { question: t('faq_q5'), answer: t('faq_a5') },
  { question: t('faq_q6'), answer: t('faq_a6') },
])

useHead({
  title: 'FAQ — LENS Photography',
})
</script>
