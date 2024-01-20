<script setup lang="ts">
import { useStore } from '@/stores/store'
import { FwbCard, FwbHeading, FwbInput, FwbButton } from 'flowbite-vue'
import { reactive } from 'vue'

const store = useStore()
const userData = reactive({ username: '', password: '' })

function handleLogin() {
  store.login(userData)
}
</script>
<template>
  <div class="flex justify-center items-center h-[100vh]">
    <form @submit.prevent="handleLogin">
      <FwbCard variant="image" class="w-[500px] p-6">
        <div class="flex flex-col gap-4">
          <FwbHeading>HOLKA</FwbHeading>
          <FwbInput
            type="text"
            v-model="userData.username"
            label="Имя Пользователя"
            class="w-full"
          />
          <FwbInput type="password" v-model="userData.password" label="Пароль" class="w-full" />
          <div class="flex justify-end">
            <FwbButton type="submit" color="green">Войти</FwbButton>
          </div>
        </div>
      </FwbCard>
    </form>
  </div>
</template>
