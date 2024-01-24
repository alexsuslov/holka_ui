<script setup lang="ts">
//@ts-nocheck
import router from '@/router'
import { useStore } from '@/stores/store'
import { FwbButton, FwbCarousel, FwbHeading, FwbP } from 'flowbite-vue'
import { onMounted, ref, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { PhotoIcon, ArrowUturnLeftIcon, TrashIcon } from '@heroicons/vue/24/solid'
import VItemForm from '@/components/VItemForm.vue'
import VButton from '../components/VButton.vue'

const store = useStore()
const { selectedItem, user } = storeToRefs(store)
const route = router.currentRoute
const isEdtable = computed(() => user.value.userId == selectedItem.value.owner)

onMounted(() => {
  store.fetchItemById(route.value.params.id)
})
const pictures = computed(() =>
  selectedItem?.value?.images?.map((imageUrl: string, i: number) => {
    return {
      src: encodeURI(`http://192.168.31.100:3000${imageUrl}`),
      alt: `item_image_${i}`
    }
  })
)
function handleDelete(id: string) {
  store.deleteItem(id)
  router.push('/')
}
</script>
<template>
  <!-- <div class="relative top-0 left-0 px-2">
    <FwbButton variant="green">
      <ArrowUturnLeftIcon class="w-5 h-5" />
    </FwbButton>
  </div> -->
  <div class="flex flex-col items-center p-2">
    <div v-if="pictures" class="w-full h-auto lg:w-1/2">
      <FwbCarousel slide :pictures="pictures" class="w-auto" />
    </div>
    <div
      v-else
      class="bg-slate-500 w-full lg:w-1/2 h-[250px] rounded-lg flex justify-center items-center"
    >
      <PhotoIcon class="w-10 h-10 text-white" />
    </div>
    <div class="flex flex-col w-full gap-2 lg:w-1/2">
      <FwbHeading tag="h3">{{ selectedItem.title ?? '-' }}</FwbHeading>
      <FwbHeading tag="h5">{{ selectedItem.price ?? '-' }} Руб</FwbHeading>
      <FwbP>{{ 'Санкт-Петербург, Россия' }}</FwbP>
      <FwbP>
        {{ `Товар создан ${new Date(selectedItem.created_on).toLocaleDateString()}` ?? '-' }}
      </FwbP>
    </div>
  </div>
  <div v-show="isEdtable">
    <VButton class="fixed bottom-0 left-0 m-4" danger @click="handleDelete(selectedItem.id)">
      Удалить товар
      <TrashIcon class="w-5 h-5" />
    </VButton>
    <VItemForm label="Изменить товар" variant="edit" />
  </div>
</template>
