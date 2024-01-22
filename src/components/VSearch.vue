<script setup lang="ts">
const emit = defineEmits(['onHandlePress'])
const searchValue = defineModel<string>()
</script>
<template>
  <div class="flex items-center p-2 border-b rounded-lg bg-slate-700 dark:bg-slate-100">
    <svg
      aria-hidden="true"
      class="w-5 h-5 mr-2"
      fill="none"
      stroke="lightgrey"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
    <input
      placeholder="search"
      v-model="searchValue"
      class="w-full bg-slate-700 dark:bg-slate-100 focus:outline-none"
      @keypress.enter="emit('onHandlePress', searchValue)"
    />
  </div>
</template>
