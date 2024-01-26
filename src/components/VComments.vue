<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/store'
import { onMounted } from 'vue'
import router from '@/router'
import { FwbHeading, FwbP, FwbCard } from 'flowbite-vue'
import VSpacer from '@/components/VSpacer.vue'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/vue/24/solid'
const store = useStore()
const { getItemComments } = storeToRefs(store)

const route = router.currentRoute

onMounted(() => {
  store.fetchItemComments(route.value.params.id as string)
})
</script>
<template>
  <FwbHeading tag="h6">Отзывы</FwbHeading>
  <VSpacer />
  <div class="flex gap-2 flex-col overflow-y-auto h-[30svh] lg:h-[80svh]">
    <FwbCard type="image" v-for="(com, i) in Array(60)" :key="i" class="w-full p-2">
      <FwbHeading tag="h6">Name</FwbHeading>
      <FwbP class="text-xs">{{ new Date().toLocaleDateString() }}</FwbP>
      <VSpacer />
      <FwbP>12321312</FwbP>
      <!-- <FwbHeading tag="h6"> {{ com.owner ?? '-' }} _</FwbHeading>
      <FwbP>{{ com.text ?? '-' }}</FwbP>
      <FwbP>
        {{ new Date(com.created_on).toLocaleDateString() ?? '-' }}
      </FwbP> -->
      <VSpacer />
      <div class="flex gap-2">
        <HandThumbUpIcon
          class="w-10 h-10 p-2 text-white rounded-3xl dark:text-slate-500 bg-slate-200"
        />
        <HandThumbDownIcon
          class="w-10 h-10 p-2 text-white rounded-3xl dark:text-slate-500 bg-slate-200"
        />
      </div>
    </FwbCard>
  </div>
</template>
