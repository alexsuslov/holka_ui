<script setup lang="ts">
import type { IState } from '@/stores/interfaces'
import { useStore } from '@/stores/store'
import { FwbHeading, FwbP, FwbCarousel } from 'flowbite-vue'

const { selectedItem }: IState = useStore()

const pictures = selectedItem?.images?.map((imageUrl: string, i: number) => {
  return {
    src: encodeURI(`http://192.168.31.100:3000/media/${imageUrl}/1.png`),
    alt: `item_image_${i}`
  }
})
</script>
<template>
  <div>
    <FwbCarousel :pictures="pictures" />
    <h3>{{ selectedItem.title }}</h3>
    <h5>{{ selectedItem.price }} Руб</h5>
    <p>{{ 'Санкт-Петербург, Россия' }}</p>
    <p>
      {{ `Created On ${new Date(selectedItem.created_on).toLocaleDateString()}` }}
    </p>
  </div>
</template>
