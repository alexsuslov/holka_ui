<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/stores/store'
import { FwbCarousel, FwbHeading, FwbP } from 'flowbite-vue'
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PhotoIcon, TrashIcon } from '@heroicons/vue/24/solid'
import VItemForm from '@/components/VItemForm.vue'
import VButton from '@/components/VButton.vue'
import VComments from '@/components/VComments.vue'

const store = useStore()
const { selectedItem, user } = storeToRefs(store)
const route = router.currentRoute
const isEdtable = computed(() => user.value.userId == selectedItem.value.owner)

onMounted(() => {
  store.fetchItemById(route.value.params.id as string)
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
  <div class="grid grid-cols-1 gap-4 p-2 lg:grid-cols-4">
    <div class="hidden lg:block">
      <FwbHeading tag="h2">Additional Info</FwbHeading>
    </div>
    <div class="flex flex-col col-span-2">
      <div v-if="pictures" class="rounded-lg bg-slate-500">
        <FwbCarousel :pictures="pictures" class="p-12 lg:p-16 min-h-[320px]" />
      </div>
      <div
        v-else
        class="bg-slate-500 w-full min-h-[320px] rounded-lg flex justify-center items-center"
      >
        <PhotoIcon class="w-10 h-10 text-white" />
      </div>
      <div class="flex flex-col w-full gap-2">
        <div>
          <FwbHeading tag="h2">{{ selectedItem.title ?? '-' }}</FwbHeading>
          <FwbHeading tag="h4">{{ selectedItem.price ?? '-' }} Руб</FwbHeading>
          <FwbP>{{ 'Санкт-Петербург, Россия' }}</FwbP>
          <FwbP class="text-xs">
            {{ `Товар создан ${new Date(selectedItem.created_on).toLocaleDateString()}` ?? '-' }}
          </FwbP>
        </div>
        <FwbHeading tag="h6">Описание</FwbHeading>
        <FwbP>{{ selectedItem.info ?? '-' }}</FwbP>
      </div>
    </div>
    <div>
      <VComments />
    </div>
  </div>
  <div
    v-show="isEdtable"
    class="sticky bottom-0 z-40 left-0 right-0 w-full flex items-center justify-between border-t border-slate-500 dark:bg-slate-900 h-[50px] p-2"
  >
    <VButton danger @click="handleDelete(selectedItem.id)">
      Удалить товар
      <TrashIcon class="w-5 h-5" />
    </VButton>
    <VItemForm label="Изменить товар" variant="edit" />
  </div>
</template>
