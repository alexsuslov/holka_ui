<script setup lang="ts">
import type { Item } from '@/stores/interfaces'
import { FwbCard, FwbImg, FwbHeading, FwbP } from 'flowbite-vue'
withDefaults(defineProps<{ item: Item }>(), {
  item: { image: [], title: 'название', price: 'цена' }
})
</script>
<template>
  <FwbCard href="#">
    <div class="flex flex-col w-full p-5">
      <FwbImg alt="item_image" :src="item.images?.[0]" class="w-[250px] h-[250px]" />
      <div>
        <FwbHeading tag="h3">{{ item.title }}</FwbHeading>
        <FwbHeading tag="h5">{{ item.price }} Руб</FwbHeading>
        <FwbP>{{ 'Санкт-Петербург, Россия' }}</FwbP>
        <FwbP>
          {{ `Created On ${new Date().toLocaleDateString()}` }}
        </FwbP>
      </div>
    </div>
  </FwbCard>
</template>
