<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <!-- Back link -->
    <NuxtLink
      :to="localePath('/blogs')"
      class="inline-flex items-center gap-2 text-charcoal-400 hover:text-gold-400 transition-colors mb-10"
    >
      <AIcon name="arrow-left" size="18" />
      {{ $t('blogs_back') }}
    </NuxtLink>

    <!-- Article found -->
    <article v-if="post.title" class="animate-fade-in-up">
      <!-- Header image placeholder -->
      <div class="aspect-[21/9] rounded-2xl bg-gradient-to-br from-charcoal-700 to-charcoal-800 flex items-center justify-center mb-10">
        <AIcon name="image" size="56" class="text-charcoal-600" />
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-3 mb-6">
        <AIcon name="calendar" size="16" class="text-gold-400" />
        <time :datetime="post.date" class="text-sm text-charcoal-400">{{ formatDate(post.date) }}</time>
      </div>

      <!-- Title -->
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-10 leading-tight">{{ post.title }}</h1>

      <!-- Intro -->
      <p class="text-charcoal-300 text-lg leading-relaxed mb-10">{{ post.intro }}</p>

      <!-- Sections -->
      <section v-for="(section, i) in post.sections" :key="i" class="mb-8">
        <h2 class="text-xl font-semibold text-gold-300 mb-3">{{ section.title }}</h2>
        <p class="text-charcoal-400 leading-relaxed">{{ section.body }}</p>
      </section>
    </article>

    <!-- Not found fallback -->
    <div v-else class="text-center py-20">
      <h1 class="text-4xl font-bold text-white mb-4">{{ $t('page_not_found_title') }}</h1>
      <p class="text-charcoal-400 mb-8">{{ $t('page_not_found_message') }}</p>
      <ABaseButton variant="primary" :to="localePath('/')">
        {{ $t('page_not_found_cta') }}
      </ABaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const slug = computed(() => (route.params.title as string) || '')

interface BlogSection { title: string; body: string }
interface BlogPost {
  title: string
  date: string
  intro: string
  sections: BlogSection[]
}

const postsMap = computed<Record<string, BlogPost>>(() => ({
  'golden-hour-portraits': {
    title: t('blog_1_title'),
    date: t('blog_1_date'),
    intro: t('blog_1_intro'),
    sections: t('blog_1_sections') as unknown as BlogSection[],
  },
  'wedding-photography-prep': {
    title: t('blog_2_title'),
    date: t('blog_2_date'),
    intro: t('blog_2_intro'),
    sections: t('blog_2_sections') as unknown as BlogSection[],
  },
  'black-and-white-art': {
    title: t('blog_3_title'),
    date: t('blog_3_date'),
    intro: t('blog_3_intro'),
    sections: t('blog_3_sections') as unknown as BlogSection[],
  },
}))

const post = computed(() => postsMap.value[slug.value] || {} as BlogPost)

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead(() => ({
  title: post.value.title ? `${post.value.title} — LENS Photography` : 'Blog — LENS Photography',
}))
</script>
