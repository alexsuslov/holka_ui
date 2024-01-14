<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import VSearch from './VSearch.vue'

function onHandlePress(value: string) {
  console.log(value)
}
</script>
<template>
  <nav class="flex justify-between items-center border-b p-2">
    <RouterLink to="/">
      <FwbButton color="default">Home</FwbButton>
    </RouterLink>
    <VSearch class="w-1/3" @onHandlePress="onHandlePress" />
    <RouterLink to="/ws">
      <FwbButton color="default">WS</FwbButton>
    </RouterLink>
  </nav>
</template>
˜
