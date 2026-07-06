<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :type="to ? undefined : type"
    :to="to"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400',
      variantClasses,
      sizeClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <AIcon v-if="icon && iconPosition === 'left'" :name="icon" :size="iconSize" />
    <slot />
    <AIcon v-if="icon && iconPosition === 'right'" :name="icon" :size="iconSize" />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'outline' | 'ghost'>,
    default: 'primary',
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  icon: { type: String, default: '' },
  iconPosition: { type: String as PropType<'left' | 'right'>, default: 'left' },
  disabled: { type: Boolean, default: false },
  to: { type: [String, Object] as PropType<RouteLocationRaw>, default: '' },
})

const variantClasses = computed(() => {
  const map: Record<string, string> = {
    primary: 'bg-gold-500 text-charcoal-950 hover:bg-gold-400 active:bg-gold-600',
    secondary: 'bg-charcoal-700 text-charcoal-100 hover:bg-charcoal-600 active:bg-charcoal-800',
    outline: 'border border-gold-500 text-gold-400 hover:bg-gold-500/10 active:bg-gold-500/20',
    ghost: 'text-charcoal-300 hover:text-gold-400 hover:bg-charcoal-800 active:bg-charcoal-700',
  }
  return map[props.variant] || map.primary
})

const sizeClasses = computed(() => {
  const map: Record<string, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-7 py-3.5',
  }
  return map[props.size] || map.md
})

const iconSize = computed(() => {
  const map: Record<string, string> = { sm: '16', md: '18', lg: '20' }
  return map[props.size] || '18'
})
</script>
