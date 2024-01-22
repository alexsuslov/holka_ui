<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

interface IButton {
  disabled?: boolean
  success?: boolean
  primary?: boolean
  danger?: boolean
}

defineProps<IButton>()
const emit = defineEmits<{ onClick: [void] }>()
</script>
<template>
  <button
    @click="emit('onClick')"
    :disabled="disabled"
    :class="
      twMerge(
        'flex justify-center items-center gap-2 rounded-lg px-4 py-2 text-white text-sm',
        success && 'bg-green-600 hover:bg-green-800',
        primary && 'bg-blue-600 hover:bg-blue-800',
        danger && 'bg-red-600 hover:bg-red-800',
        disabled && 'disabled bg-slate-500 hover:bg-slate-500'
      )
    "
  >
    <slot></slot>
  </button>
</template>
