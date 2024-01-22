<script setup lang="ts">
import { FwbCard, FwbHeading, FwbP, FwbImg } from 'flowbite-vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'
const { item } = defineProps(['item'])
const imageUrl = encodeURI(`http://192.168.31.100:3000${item?.images?.[0]}`)
</script>
<template>
  <FwbCard>
    <div class="flex flex-col w-auto p-3">
      <div class="flex justify-center">
        <div
          v-if="item?.images?.length"
          class="flex rounded-lg justify-center items-center w-full h-[250px] bg-slate-500"
        >
          <FwbImg :src="imageUrl" class="max-w-full max-h-full" />
        </div>
        <div
          v-else
          class="bg-slate-500 w-full h-[250px] rounded-lg flex justify-center items-center"
        >
          <PhotoIcon class="w-10 h-10 text-white" />
        </div>
      </div>
      <div>
        <FwbHeading tag="h3">{{ item.title ?? '_' }}</FwbHeading>
        <FwbHeading tag="h5">{{ item.price }} Руб</FwbHeading>
        <FwbP>{{ 'Санкт-Петербург, Россия' }}</FwbP>
        <FwbP>
          {{ `Товар создан ${new Date(item.created_on).toLocaleDateString()}` }}
        </FwbP>
      </div>
    </div>
  </FwbCard>
</template>
