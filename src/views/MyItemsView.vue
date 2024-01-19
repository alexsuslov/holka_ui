<script setup lang="ts">
import VItem from '@/components/VItem.vue'
import VAddItemForm from '@/components/VAddItemForm.vue'
import { useStore } from '@/stores/store'
import { onMounted } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { FwbSpinner } from 'flowbite-vue'

const store = useStore()
const { getOwnerItemsLength } = storeToRefs(store)

onMounted(() => {
  if (getOwnerItemsLength.value == 0) {
    store.fetchMyItems()
  }
})
</script>
<template>
  <div class="flex items-center content-center justify-center h-[80vh]" v-if="!getOwnerItemsLength">
    <FwbSpinner color="white" size="12" />
  </div>
  <div
    class="grid justify-center w-full grid-cols-1 gap-4 p-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
  >
    <VItem
      v-for="item in store.ownerItems.items"
      :key="item.id"
      :item="item"
      @click="router.push(`/items/${item.id}`)"
    />
  </div>
  <VAddItemForm />
</template>
