<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <!-- Dynamic page content -->
    <article class="animate-fade-in-up">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-8">
        {{ pageTitle }}
      </h1>
      <div class="prose-custom">
        <p v-if="title === 'privacy'">
          This Privacy Policy describes how LENS Photography collects, uses, and protects your personal information.
          We are committed to ensuring that your privacy is protected.
        </p>
        <p v-if="title === 'privacy'">
          We collect information you provide directly, such as your name and email address when you submit our contact form.
          This information is used solely to respond to your inquiries and provide our services.
        </p>
        <h2 v-if="title === 'privacy'">Information Security</h2>
        <p v-if="title === 'privacy'">
          We implement appropriate security measures to protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>

        <p v-if="title === 'terms'">
          By accessing and using the LENS Photography website, you agree to comply with these Terms of Service.
        </p>
        <h2 v-if="title === 'terms'">Services</h2>
        <p v-if="title === 'terms'">
          All photography services are provided subject to a separate written agreement. Pricing, deliverables,
          and timelines are specified in individual contracts.
        </p>
        <h2 v-if="title === 'terms'">Intellectual Property</h2>
        <p v-if="title === 'terms'">
          All photographs and content on this website are the intellectual property of LENS Photography.
          Unauthorized use, reproduction, or distribution is prohibited.
        </p>

        <p v-if="title !== 'privacy' && title !== 'terms'" class="text-charcoal-400">
          Page content for "{{ title }}" coming soon.
        </p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const title = computed(() => (route.params.title as string) || '')

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  }
  return titles[title.value] || title.value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
})

useHead(() => ({
  title: `${pageTitle.value} — LENS Photography`,
}))
</script>
