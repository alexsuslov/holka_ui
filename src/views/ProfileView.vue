<script setup lang="ts">
import { useStore } from '@/stores/store'
import { FwbButton } from 'flowbite-vue'

const { logout } = useStore()
</script>

<template>
  <div>Profile</div>
  <FwbButton @click="logout">Выйти</FwbButton>
</template>
