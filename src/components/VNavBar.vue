<script setup lang="ts">
import { FwbButton, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import VSearch from './VSearch.vue'

function onHandlePress(value: string) {
  console.log(value)
}
const loggedIn = true
</script>
<template>
  <nav class="flex items-center justify-between p-2 border-b">
    <RouterLink to="/">
      <FwbButton color="default">Home</FwbButton>
    </RouterLink>

    <VSearch class="w-1/3" @onHandlePress="onHandlePress" />

    <FwbDropdown v-if="loggedIn" text="Меню" class="flex justify-end">
      <FwbListGroup class="flex flex-col w-[130px]">
        <RouterLink to="/profile">
          <FwbListGroupItem hover>Профиль</FwbListGroupItem>
        </RouterLink>
        <RouterLink to="/my_items">
          <FwbListGroupItem hover>Мои товары</FwbListGroupItem>
        </RouterLink>
      </FwbListGroup>
    </FwbDropdown>

    <FwbButton v-else>Логин</FwbButton>
  </nav>
</template>
˜
