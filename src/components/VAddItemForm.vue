<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { ref } from 'vue'
import VAddItemModal from './VAddItemModal.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

const isShowModal = ref<boolean>(false)

function showModal() {
  isShowModal.value = true
}
function closeModal() {
  isShowModal.value = false
}
</script>
<template>
  <FwbButton color="green" class="absolute bottom-0 right-0 m-4" @click="showModal">
    <div class="flex items-center w-full gap-2">
      Добавить товар
      <PlusIcon class="w-5 h-5" />
    </div>
  </FwbButton>
  <VAddItemModal v-if="isShowModal" @close="closeModal" />
</template>
