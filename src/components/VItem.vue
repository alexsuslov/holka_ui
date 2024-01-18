<script setup lang="ts">
import type { Item } from '@/stores/interfaces'
import { FwbCard, FwbHeading, FwbP, FwbCarousel } from 'flowbite-vue'

const props = defineProps(['item'])

// const pictures = props.item.images.map((imageUrl, i) => {
//   console.log(imageUrl)
//   return { src: imageUrl, alt: `item_image_${i}` }
// })
// function makeImage(file: File) {
//   return URL.createObjectURL(file)
// }
</script>
<template>
  <FwbCard href="#">
    <div class="flex flex-col w-auto p-5">
      <!-- <FwbCarousel :pictures="pictures" class="w-[250px] h-[250px]" /> -->
      <div>
        <FwbHeading tag="h3">{{ item.title }}</FwbHeading>
        <FwbHeading tag="h5">{{ item.price }} Руб</FwbHeading>
        <FwbP>{{ 'Санкт-Петербург, Россия' }}</FwbP>
        <FwbP>
          {{ `Created On ${new Date(item.created_on).toLocaleDateString()}` }}
        </FwbP>
      </div>
    </div>
  </FwbCard>
</template>
