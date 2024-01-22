<script setup lang="ts">
import VItem from '@/components/VItem.vue'
import VItemForm from '@/components/VItemForm.vue'
import { useStore } from '@/stores/store'
import { onMounted } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { FwbSpinner } from 'flowbite-vue'
import type { Item } from '@/stores/interfaces'

const store = useStore()
const { getOwnerItemsLength } = storeToRefs(store)

onMounted(() => {
  if (getOwnerItemsLength.value == 0) {
    store.fetchMyItems()
  }
})
function handleItemClick(item: Item) {
  router.push(`/items/${item.id}`)
  store.selectItem(item)
}
</script>
<template>
  <div class="flex items-center content-center justify-center h-[80vh]" v-if="!getOwnerItemsLength">
    <FwbSpinner color="white" size="12" />
  </div>
  <div
    v-else
    class="grid justify-center gap-4 p-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
  >
    <VItem
      v-for="item in store.ownerItems.items"
      :key="item.id"
      :item="item"
      @click="handleItemClick(item)"
    />
  </div>
  <VItemForm label="Добавить товар" variant="add" />
</template>
