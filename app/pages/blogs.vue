<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16 animate-fade-in-up">
      <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">{{ $t('blogs_title') }}</h1>
      <p class="text-charcoal-400 text-xl">{{ $t('blogs_subtitle') }}</p>
    </div>

    <!-- Blog Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="(post, index) in blogPosts"
        :key="post.slug"
        class="group rounded-2xl bg-charcoal-800/30 border border-charcoal-800 overflow-hidden hover:border-gold-500/30 transition-all duration-300 animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Thumbnail placeholder -->
        <div class="aspect-[16/10] bg-gradient-to-br from-charcoal-700 to-charcoal-800 flex items-center justify-center">
          <AIcon name="image" size="40" class="text-charcoal-600 group-hover:text-gold-400/20 transition-colors" />
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="flex items-center gap-3 mb-3">
            <AIcon name="calendar" size="14" class="text-charcoal-500" />
            <time :datetime="post.date" class="text-xs text-charcoal-500">{{ formatDate(post.date) }}</time>
          </div>
          <h2 class="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
            {{ post.title }}
          </h2>
          <p class="text-charcoal-400 leading-relaxed mb-5">
            {{ post.excerpt }}
          </p>
          <NuxtLink
            :to="localePath(`/blog/${post.slug}`)"
            class="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors font-medium text-sm"
          >
            {{ $t('blogs_read_more') }}
            <AIcon name="arrow-right" size="16" />
          </NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const blogPosts = computed(() => [
  {
    slug: 'golden-hour-portraits',
    title: t('blog_1_title'),
    date: t('blog_1_date'),
    excerpt: t('blog_1_excerpt'),
  },
  {
    slug: 'wedding-photography-prep',
    title: t('blog_2_title'),
    date: t('blog_2_date'),
    excerpt: t('blog_2_excerpt'),
  },
  {
    slug: 'black-and-white-art',
    title: t('blog_3_title'),
    date: t('blog_3_date'),
    excerpt: t('blog_3_excerpt'),
  },
])

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

useHead({
  title: 'Blog — LENS Photography',
})
</script>
