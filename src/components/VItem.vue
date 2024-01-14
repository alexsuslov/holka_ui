<script setup lang="ts">
import { FwbCard, FwbImg } from 'flowbite-vue'
</script>

<template>
  <FwbCard href="#">
    <div class="w-full flex flex-col p-5">
      <FwbImg alt="item_image" src="" class="w-[250px] h-[250px]" />
      <div>
        <p class="mb-2 text-2xl font-bold text-white">{{ 'название' }}</p>
        <h2 class="mb-2 text-white font-bold text-2xl">{{ 'цена' }}</h2>
        <p class="text-white">{{ 'Санкт-Петербург, Россия' }}</p>
        <p class="font-normal text-gray-400">
          {{ `Created On ${new Date().toLocaleDateString()}` }}
        </p>
      </div>
    </div>
  </FwbCard>
</template>
