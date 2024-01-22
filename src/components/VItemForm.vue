<script setup lang="ts">
import { ref } from 'vue'
import VAddItemModal from './VAddItemModal.vue'
import VEditItemModal from './VEditItemModal.vue'
import { PlusIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'
import VButton from './VButton.vue'

defineProps(['label', 'variant'])

const isShowModal = ref<boolean>(false)

function showModal() {
  isShowModal.value = true
  document.body.style.overflow = 'hidden'
}
function closeModal() {
  isShowModal.value = false
  document.body.style.overflow = 'initial'
}
</script>
<template>
  <VButton class="fixed bottom-0 right-0 m-4" success @click="showModal">
    {{ label }}
    <PlusIcon v-if="variant !== 'edit'" class="w-5 h-5" />
    <PencilSquareIcon v-else class="w-5 h-5" />
  </VButton>
  <VAddItemModal v-if="isShowModal" @close="closeModal" />
  <VEditItemModal v-if="isShowModal && variant == 'edit'" @close="closeModal" />
</template>
