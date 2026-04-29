<template>
  <div :class="containerClass" role="status" :aria-label="ariaLabel">
    <div :class="spinnerClass">
      <svg
        class="animate-spin"
        :class="svgClass"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </div>
    <p v-if="text" class="mt-2 text-sm text-gray-600">{{ text }}</p>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'white', 'gray'].includes(value)
  },
  text: {
    type: String,
    default: ''
  },
  centered: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Loading content'
  }
})

const containerClass = computed(() => {
  let classes = ['flex', 'flex-col', 'items-center']
  if (props.centered) {
    classes.push('justify-center', 'min-h-64')
  }
  return classes.join(' ')
})

const spinnerClass = computed(() => {
  let classes = ['rounded-full', 'border-2', 'border-t-transparent']
  
  switch (props.size) {
    case 'small':
      classes.push('h-4', 'w-4')
      break
    case 'large':
      classes.push('h-12', 'w-12')
      break
    default:
      classes.push('h-8', 'w-8')
  }
  
  switch (props.color) {
    case 'white':
      classes.push('border-white')
      break
    case 'gray':
      classes.push('border-gray-300')
      break
    default:
      classes.push('border-kigali-blue')
  }
  
  return classes.join(' ')
})

const svgClass = computed(() => {
  let classes = []
  
  switch (props.size) {
    case 'small':
      classes.push('h-3', 'w-3')
      break
    case 'large':
      classes.push('h-8', 'w-8')
      break
    default:
      classes.push('h-5', 'w-5')
  }
  
  switch (props.color) {
    case 'white':
      classes.push('text-white')
      break
    case 'gray':
      classes.push('text-gray-400')
      break
    default:
      classes.push('text-kigali-blue')
  }
  
  return classes.join(' ')
})
</script>
