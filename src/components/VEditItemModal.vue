<script setup lang="ts">
//@ts-nocheck
import {
  FwbButton,
  FwbInput,
  FwbModal,
  FwbTextarea,
  FwbHeading,
  FwbBadge,
  FwbP,
  FwbImg
} from 'flowbite-vue'
import { reactive, watchEffect, ref, type Ref } from 'vue'
import { PlusIcon, XMarkIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import type { Item } from '@/stores/interfaces'

const emit = defineEmits(['close', 'addItem'])
defineProps(['label', 'isShowModal', 'variant'])
const store = useStore()
const { selectedItem } = storeToRefs(store)
const isAddImagesButtonDisabled = ref(true)
const isAddItemButtonDisabled = ref(true)
const isAddImagesButtonVisible = ref(false)
const files: Ref<FileList | never[]> = ref([])
const itemData: Item & { tag?: '' } = reactive({
  ...selectedItem.value
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

function handleDeleteImage(image: string) {
  const newImages = itemData.images?.filter((v) => v !== image)
  itemData.images = newImages
}

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement
  if (target && target.files) {
    files.value = target.files
  }
}

function handleAddImages() {
  delete itemData.tag
  delete itemData.updated_on
  isAddImagesButtonVisible.value = true
  isAddImagesButtonDisabled.value = true
}

async function addImage(id: string, file: File, promise: Promise<Response>) {
  const res = await promise
  const result = await res.json()
  const { Key } = result
  itemData.images.push(`/media/${Key}/${file.name}`)
  await store.addImagesToItem(id, itemData.images)
  await store.editItem(itemData)
}

async function onSubmit() {
  await Array.from(files.value).forEach((file) =>
    addImage(itemData.id, file, store.uploadImage(file))
  )
  emit('close')
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
        <FwbHeading tag="h4">Изменить товар</FwbHeading>
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
          <div :v-show="itemData?.tags?.length > 0" class="flex flex-row flex-wrap gap-2">
            <FwbBadge v-for="tag in itemData.tags" :key="tag" @click="deleteTag(tag)">
              {{ tag }}
              <XMarkIcon class="w-5 h-5 text-red-500" />
            </FwbBadge>
          </div>
          <div class="flex flex-col gap-2">
            <FwbHeading tag="h5">Загруженные фотографии</FwbHeading>
            <div class="flex gap-4">
              <div
                v-for="image in itemData.images"
                :key="image"
                class="flex items-center justify-center"
              >
                <TrashIcon
                  class="absolute w-5 h-5 text-red-500"
                  @click="handleDeleteImage(image)"
                />
                <FwbImg
                  :src="encodeURI(`http://192.168.31.100:3000${image}`)"
                  class="w-[50px] h-[50px] lg:w-auto lg:h-[100px]"
                />
              </div>
            </div>
          </div>
          <div>
            <FwbButton v-if="!isAddImagesButtonDisabled" type="button" @click="handleAddImages"
              >Добавить фотографии
            </FwbButton>
            <FwbButton v-else disabled>Добавить фотографии </FwbButton>
          </div>
          <div v-show="isAddImagesButtonVisible">
            <input
              @change="onFileChanged($event)"
              type="file"
              accept="image/*"
              label="Загрузить фотографии"
              multiple
            />
            <div v-show="files && files?.length > 0" class="flex flex-row flex-wrap gap-2">
              <div v-for="(file, i) in files" :key="i">
                <FwbP>{{ file.name }};</FwbP>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <FwbButton @click="emit('close')" color="red">Отмена</FwbButton>
          <FwbButton type="submit" color="green">Сохранить</FwbButton>
        </div>
      </template>
    </FwbModal>
  </form>
</template>
