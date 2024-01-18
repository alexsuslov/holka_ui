<script setup lang="ts">
import { RouterView } from 'vue-router'
import VNavBar from './components/VNavBar.vue'
import { useStore } from './stores/store'
import AuthView from './views/AuthView.vue'
import { storeToRefs } from 'pinia'

const store = useStore()
const { isLoggedIn } = storeToRefs(store)
</script>

<template>
  <div v-if="!isLoggedIn">
    <AuthView />
  </div>
  <div v-else>
    <VNavBar />
    <div class="mt-20">
      <RouterView />
    </div>
  </div>
</template>

<style></style>
