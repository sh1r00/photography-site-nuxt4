<template>
  <div class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16 animate-fade-in-up">
      <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">{{ $t('contact_title') }}</h1>
      <p class="text-charcoal-400 text-xl">{{ $t('contact_subtitle') }}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Form -->
      <div class="lg:col-span-2 animate-fade-in-up">
        <form
          v-if="!submitted"
          class="space-y-6"
          novalidate
          @submit.prevent="handleSubmit"
        >
          <!-- Name -->
          <div>
            <label for="contact-name" class="block text-sm font-medium text-charcoal-300 mb-2">
              {{ $t('contact_name_label') }}
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              :placeholder="$t('contact_name_placeholder')"
              :aria-invalid="errors.name ? 'true' : 'false'"
              :aria-describedby="errors.name ? 'contact-name-error' : undefined"
              class="w-full px-4 py-3 rounded-lg bg-charcoal-800 border text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
              :class="errors.name ? 'border-red-500' : 'border-charcoal-700'"
              required
            />
            <p v-if="errors.name" id="contact-name-error" class="mt-1 text-sm text-red-400">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label for="contact-email" class="block text-sm font-medium text-charcoal-300 mb-2">
              {{ $t('contact_email_label') }}
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              :placeholder="$t('contact_email_placeholder')"
              :aria-invalid="errors.email ? 'true' : 'false'"
              :aria-describedby="errors.email ? 'contact-email-error' : undefined"
              class="w-full px-4 py-3 rounded-lg bg-charcoal-800 border text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
              :class="errors.email ? 'border-red-500' : 'border-charcoal-700'"
              required
            />
            <p v-if="errors.email" id="contact-email-error" class="mt-1 text-sm text-red-400">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label for="contact-phone" class="block text-sm font-medium text-charcoal-300 mb-2">
              {{ $t('contact_phone_label') }}
            </label>
            <input
              id="contact-phone"
              v-model="form.phone"
              type="tel"
              :placeholder="$t('contact_phone_placeholder')"
              class="w-full px-4 py-3 rounded-lg bg-charcoal-800 border border-charcoal-700 text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Service -->
          <div>
            <label for="contact-service" class="block text-sm font-medium text-charcoal-300 mb-2">
              {{ $t('contact_service_label') }}
            </label>
            <select
              id="contact-service"
              v-model="form.service"
              class="w-full px-4 py-3 rounded-lg bg-charcoal-800 border border-charcoal-700 text-charcoal-100 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors"
            >
              <option value="">{{ $t('contact_service_option_select') }}</option>
              <option value="weddings">{{ $t('contact_service_option_weddings') }}</option>
              <option value="portraits">{{ $t('contact_service_option_portraits') }}</option>
              <option value="commercial">{{ $t('contact_service_option_commercial') }}</option>
            </select>
          </div>

          <!-- Message -->
          <div>
            <label for="contact-message" class="block text-sm font-medium text-charcoal-300 mb-2">
              {{ $t('contact_message_label') }}
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              :placeholder="$t('contact_message_placeholder')"
              :aria-invalid="errors.message ? 'true' : 'false'"
              :aria-describedby="errors.message ? 'contact-message-error' : undefined"
              rows="5"
              class="w-full px-4 py-3 rounded-lg bg-charcoal-800 border text-charcoal-100 placeholder:text-charcoal-500 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors resize-y"
              :class="errors.message ? 'border-red-500' : 'border-charcoal-700'"
              required
            />
            <p v-if="errors.message" id="contact-message-error" class="mt-1 text-sm text-red-400">{{ errors.message }}</p>
          </div>

          <!-- Submit -->
          <ABaseButton type="submit" variant="primary" size="lg" icon="send" icon-position="right">
            {{ $t('contact_submit') }}
          </ABaseButton>
        </form>

        <!-- Success message -->
        <div v-else class="text-center py-10">
          <div class="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
            <AIcon name="check" size="32" class="text-gold-400" />
          </div>
          <p class="text-charcoal-200 text-lg">{{ $t('contact_success') }}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8 animate-fade-in-up" style="animation-delay: 0.15s">
        <!-- Location -->
        <div class="p-6 rounded-2xl bg-charcoal-800/30 border border-charcoal-800">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AIcon name="map-pin" size="20" class="text-gold-400" />
            {{ $t('contact_location_title') }}
          </h3>
          <p class="text-charcoal-400">{{ $t('contact_location_text') }}</p>
        </div>

        <!-- Social -->
        <div class="p-6 rounded-2xl bg-charcoal-800/30 border border-charcoal-800">
          <h3 class="text-lg font-semibold text-white mb-4">{{ $t('contact_social_title') }}</h3>
          <div class="flex gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-400 hover:text-gold-400 transition-colors w-full"
            >
              <AIcon :name="social.icon" size="20" />
              <span class="text-sm">{{ social.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const submitted = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})
const errors = reactive({
  name: '',
  email: '',
  message: '',
})

function validateForm(): boolean {
  errors.name = ''
  errors.email = ''
  errors.message = ''

  let valid = true
  if (!form.name.trim()) {
    errors.name = t('form_error_required')
    valid = false
  }
  if (!form.email.trim()) {
    errors.email = t('form_error_required')
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('form_error_email')
    valid = false
  }
  if (!form.message.trim()) {
    errors.message = t('form_error_required')
    valid = false
  }
  return valid
}

function handleSubmit() {
  if (validateForm()) {
    submitted.value = true
  }
}

const socials = [
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
  { name: 'Email', icon: 'mail', url: 'mailto:hello@lensphoto.com' },
]

useHead({
  title: 'Contact — LENS Photography',
})
</script>
