<script setup lang="ts">
import VItem from '@/components/VItem.vue'
import router from '@/router'
import type { Item } from '@/stores/interfaces'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { FwbSpinner } from 'flowbite-vue'
const store = useStore()
const { getItemsLength } = storeToRefs(store)
onMounted(() => {
  if (getItemsLength.value == 0) {
    store.fetchItems()
  }
})

function handleItemClick(item: Item) {
  router.push(`/items/${item.id}`)
  store.selectItem(item)
}
</script>
<template>
  <div class="flex items-center content-center justify-center h-[80vh]" v-if="!getItemsLength">
    <FwbSpinner color="white" size="12" />
  </div>
  <div v-else class="grid gap-4 p-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
    <VItem
      v-for="item in store.items.items"
      :key="item.id"
      :item="item"
      @click="handleItemClick(item)"
    />
  </div>
</template>
