<script setup lang="ts">
import { FwbCard, FwbImg } from 'flowbite-vue'
</script>

<template>
  <FwbCard href="#">
    <div class="w-full flex flex-col p-5">
      <FwbImg alt="item_image" :src="img" class="w-[250px] h-[250px]" />
      <div>
        <p class="mb-2 text-2xl font-bold text-white">{{ title || 'название' }}</p>
        <h2 class="mb-2 text-white font-bold text-2xl">{{ price || 'цена' }}</h2>
        <p class="text-white">{{ location || 'Санкт-Петербург, Россия' }}</p>
        <p class="font-normal text-gray-400">
          {{ createdOn || `Created On ${new Date().toLocaleDateString()}` }}
        </p>
      </div>
    </div>
  </FwbCard>
</template>
