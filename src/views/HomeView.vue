<script setup lang="ts">
import VItem from '@/components/VItem.vue'
import router from '@/router'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useStore()
const { getItemsLength } = storeToRefs(store)
onMounted(() => {
  if (getItemsLength.value == 0) {
    store.fetchItems()
  }
})
</script>
<template>
  <div
    class="grid justify-center gap-4 p-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
  >
    <VItem
      v-for="item in store.items.items"
      :key="item.id"
      :item="item"
      @click="router.push(`/items/${item.id}`)"
    />
  </div>
</template>
