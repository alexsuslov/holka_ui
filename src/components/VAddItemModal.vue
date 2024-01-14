<script setup lang="ts">
import {
  FwbButton,
  FwbInput,
  FwbModal,
  FwbTextarea,
  FwbHeading,
  FwbBadge,
  FwbImg
} from 'flowbite-vue'
import { reactive } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['close', 'addItem'])
defineProps(['isShowModal'])

const itemData = reactive({ title: '', tag: '', tags: [], price: '', images: [], info: '' })

function handleAddTag() {
  if (itemData.tag) {
    if (!itemData.tags?.includes(itemData.tag)) {
      itemData.tags.push(itemData.tag)
      itemData.tag = ''
    }
  }
}
function deleteTag(tag: string) {
  const newTags = itemData.tags?.filter((v) => v !== tag)
  itemData.tags = newTags
}
</script>
<template>
  <FwbModal @close="emit('close')">
    <template #header>
      <FwbHeading tag="h4">Добавление товара</FwbHeading>
    </template>
    <template #body>
      <div class="flex flex-col gap-2">
        <FwbInput v-model="itemData.title" placeholder="введите название товара" label="Название" />
        <FwbInput v-model="itemData.price" placeholder="введите цену товара" label="Цена" />
        <FwbTextarea
          v-model="itemData.info"
          placeholder="введите описание товара"
          label="Описание"
        />
        <div class="flex gap-2">
          <FwbInput v-model="itemData.tag" placeholder="введите тег" class="w-full" />
          <FwbButton color="green" @click="handleAddTag">
            <PlusIcon class="w-5 h-5" />
          </FwbButton>
        </div>
        <div :v-show="itemData.tags.length > 0" class="flex flex-row flex-wrap gap-2">
          <FwbBadge v-for="tag in itemData.tags" :key="tag" @click="deleteTag(tag)">
            {{ tag }}
            <XMarkIcon class="w-5 h-5 text-red-500" />
          </FwbBadge>
        </div>
        <FwbInput
          label="Фотографии"
          v-model="itemData.images"
          type="file"
          accept="image/*"
          multiple
          @change="
            (event) => {
              const dataTransfer = new DataTransfer()
              if (itemData.images) {
                Array.from(itemData.images).forEach((image) => dataTransfer.items.add(image))
              }
              Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image))
              const newFiles = dataTransfer.files
              itemData.images = newFiles
            }
          "
        />
        <div :v-show="itemData.images.length > 0" class="flex flex-row flex-wrap gap-2">
          <FwbImg v-for="(image, i) in itemData.images" :src="image" :key="i" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <FwbButton @click="emit('close')" color="red">Отмена</FwbButton>
        <FwbButton @click="emit('addItem')" color="green">Добавить</FwbButton>
      </div>
    </template>
  </FwbModal>
</template>
