<script setup lang="ts">
import { FwbCard, FwbImg, FwbHeading, FwbP } from 'flowbite-vue'
</script>

<template>
  <FwbCard href="#">
    <div class="w-full flex flex-col p-5">
      <FwbImg alt="item_image" src="" class="w-[250px] h-[250px]" />
      <div>
        <FwbHeading tag="h3">{{ 'название' }}</FwbHeading>
        <FwbHeading tag="h5">{{ 'цена' }}</FwbHeading>
        <FwbP>{{ 'Санкт-Петербург, Россия' }}</FwbP>
        <FwbP>
          {{ `Created On ${new Date().toLocaleDateString()}` }}
        </FwbP>
      </div>
    </div>
  </FwbCard>
</template>
