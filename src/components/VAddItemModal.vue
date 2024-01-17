<script setup lang="ts">
//@ts-nocheck
import { FwbButton, FwbInput, FwbModal, FwbTextarea, FwbHeading, FwbBadge } from 'flowbite-vue'
import { reactive } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useStore } from '@/stores/store'

const emit = defineEmits(['close', 'addItem'])
defineProps(['isShowModal'])
const store = useStore()

interface IFormData {
  title: string
  tags: string[]
  tag?: string
  price: number
  info: string
}
const itemData: IFormData = reactive({
  title: '',
  tag: '',
  tags: [],
  price: NaN,
  info: ''
})

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

function onSubmit() {
  delete itemData.tag
  console.log('onSubmit', itemData)
  store.addItem(itemData)
  emit('close')
}
</script>
<template>
  <form id="my-form" @submit.prevent="onSubmit">
    <FwbModal @close="emit('close')">
      <template #header>
        <FwbHeading tag="h4">Добавление товара</FwbHeading>
      </template>
      <template #body>
        <div class="flex flex-col gap-2">
          <FwbInput
            v-model="itemData.title"
            placeholder="введите название товара"
            label="Название"
            required
          />

          <FwbInput
            v-model="itemData.price"
            type="number"
            placeholder="введите цену товара"
            label="Цена"
            required
          />
          <FwbTextarea
            v-model="itemData.info"
            placeholder="введите описание товара"
            label="Описание"
            required
          />
          <div class="flex gap-2">
            <FwbInput v-model="itemData.tag" placeholder="введите тег" class="w-full" />
            <FwbButton type="button" color="green" @click="handleAddTag">
              <PlusIcon class="w-5 h-5" />
            </FwbButton>
          </div>
          <div :v-show="itemData.tags.length > 0" class="flex flex-row flex-wrap gap-2">
            <FwbBadge v-for="tag in itemData.tags" :key="tag" @click="deleteTag(tag)">
              {{ tag }}
              <XMarkIcon class="w-5 h-5 text-red-500" />
            </FwbBadge>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <FwbButton @click="emit('close')" color="red">Отмена</FwbButton>
          <FwbButton type="submit" color="green">Добавить</FwbButton>
        </div>
      </template>
    </FwbModal>
  </form>
</template>
