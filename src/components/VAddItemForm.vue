<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { ref } from 'vue'
import VItem from './VItem.vue'
import VAddItemModal from './VAddItemModal.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

const isShowModal = ref(false)

function showModal() {
  isShowModal.value = true
}
function closeModal() {
  isShowModal.value = false
}
function addItem() {
  console.log('add item')
  isShowModal.value = false
}
</script>
<template>
  <div
    class="grid justify-center gap-4 p-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
  >
    <VItem />
    <VItem />
    <VItem />

    <FwbButton color="green" class="absolute bottom-0 right-0 m-4" @click="showModal">
      <div class="flex items-center w-full gap-2">
        Добавить товар
        <PlusIcon class="w-5 h-5" />
      </div>
    </FwbButton>

    <VAddItemModal v-if="isShowModal" @close="closeModal" @addItem="addItem" />
  </div>
</template>
