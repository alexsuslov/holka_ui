<script setup lang="ts">
import type { Item } from '@/stores/interfaces'
import { useStore } from '@/stores/store'
import {
  FwbCard,
  FwbImg,
  FwbHeading,
  FwbP,
  FwbFileInput,
  FwbButton,
  FwbCarousel
} from 'flowbite-vue'
import { ref, type Ref } from 'vue'
defineProps<{ item: Item }>()
const store = useStore()

const files: Ref<FileList | never[]> = ref([])

function uploadImages() {
  store.uploadImages(item.id, files.value)
}
//:disabled="!Array.from(files).length"

function makeImage(file: File) {
  return URL.createObjectURL(file)
}

// const pictures = item.images.map((image, i) => {
//   return { src: image, alt: `item_image_${i}` }
// })
</script>
<template>
  <FwbCard href="#">
    <div class="flex flex-col w-auto p-5">
      <!-- <FwbCarousel v-if="true" :pictures="pictures" class="w-[250px] h-[250px]" /> -->
      <!-- // <FwbImg
      //   v-if="true"
      //   alt="item_image"
      //   src="http://192.168.31.100:3000/media/65a66e27dd6e4a95f75cadb2/1.png"
      //   class="w-[250px] h-[250px]"
      // /> -->
      <!-- <div v-else>
        <FwbFileInput label="Загрузить фотографии" v-model="files" multiple />
        <FwbButton @click="uploadImages">Загрузить</FwbButton>
        <div v-show="files && files.length > 0" class="flex flex-row flex-wrap gap-2">
          <div v-for="(image, i) in files" :key="i">
            <FwbImg
              v-show="image"
              alt="item_image"
              :src="makeImage(image)"
              class="w-[100px] h-[100px]"
            />
          </div>
        </div>
      </div> -->

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
