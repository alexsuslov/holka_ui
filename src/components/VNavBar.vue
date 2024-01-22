<script setup lang="ts">
import { FwbButton, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import VSearch from './VSearch.vue'

function onHandlePress(value: string) {
  console.log(value)
}
const loggedIn = true
</script>
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 bg-white border-b border-slate-500 dark:bg-slate-900"
  >
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
