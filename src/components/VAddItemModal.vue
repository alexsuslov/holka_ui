<script setup lang="ts">
//@ts-nocheck
import {
  FwbButton,
  FwbInput,
  FwbModal,
  FwbTextarea,
  FwbHeading,
  FwbBadge,
  FwbFileInput,
  FwbP
} from 'flowbite-vue'
import { reactive, watchEffect, ref } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useStore } from '@/stores/store'

const emit = defineEmits(['close', 'addItem'])
defineProps(['isShowModal'])
const store = useStore()
const isAddImagesButtonDisabled = ref(true)
const isAddItemButtonDisabled = ref(true)
const isAddImagesButtonVisible = ref(false)
const files: Ref<FileList | never[]> = ref([])

interface IFormData {
  title: string
  tags: string[]
  tag?: string
  price: number
  info: string
  images: FileList
}
const itemData: IFormData = reactive({
  title: '',
  tag: '',
  tags: [],
  price: NaN,
  info: '',
  images: []
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

function handleAddImages() {
  delete itemData.tag
  isAddImagesButtonVisible.value = true
  isAddImagesButtonDisabled.value = true
  // store.addItem(itemData)
}

function onSubmit() {
  store.uploadImages('65a6b60efb4e126d47016b05', files.value)
  // emit('close')
}

watchEffect(() => {
  if (
    itemData.title.length > 0 &&
    itemData.price > 0 &&
    itemData.tags.length > 0 &&
    itemData.info.length > 0
  ) {
    isAddImagesButtonDisabled.value = false
  } else {
    isAddImagesButtonDisabled.value = true
  }
})
watchEffect(() => {
  if (files.value.length > 0) {
    isAddItemButtonDisabled.value = false
  } else {
    isAddItemButtonDisabled.value = true
  }
})
</script>
<template>
  <form id="my-form" @submit.prevent="onSubmit">
    <FwbModal @close="emit('close')" size="5xl">
      <template #header>
        <FwbHeading tag="h4">Добавление товара</FwbHeading>
      </template>
      <template #body>
        <div class="flex flex-col max-h-full gap-2">
          <FwbInput
            v-model="itemData.title"
            placeholder="введите название товара"
            label="Название"
            required
            :disabled="isAddImagesButtonVisible"
          />
          <FwbInput
            v-model="itemData.price"
            type="number"
            placeholder="введите цену товара"
            label="Цена"
            required
            :disabled="isAddImagesButtonVisible"
          />
          <FwbTextarea
            v-model="itemData.info"
            placeholder="введите описание товара"
            label="Описание"
            required
            :disabled="isAddImagesButtonVisible"
          />
          <div class="flex gap-2">
            <FwbInput
              v-model="itemData.tag"
              placeholder="введите тег"
              :disabled="isAddImagesButtonVisible"
              class="w-full"
            />
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
          <div>
            <FwbButton type="button" @click="handleAddImages">Добавить фотографии </FwbButton>
            <!-- <FwbButton v-else disabled>Добавить фотографии </FwbButton> -->
          </div>
          <div v-show="isAddImagesButtonVisible">
            <FwbFileInput label="Загрузить фотографии" v-model="files" multiple />
            <div v-show="files && files.length > 0" class="flex flex-row flex-wrap gap-2">
              <div v-for="(file, i) in files" :key="i">
                <FwbP>{{ file.name }}</FwbP>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <FwbButton @click="emit('close')" color="red">Отмена</FwbButton>
          <FwbButton v-if="!isAddItemButtonDisabled" type="submit" color="green"
            >Добавить</FwbButton
          >
          <FwbButton v-else color="green" disabled>Добавить</FwbButton>
        </div>
      </template>
    </FwbModal>
  </form>
</template>
