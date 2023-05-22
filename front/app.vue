<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
</style>
<script setup>
import getClientSocket from './utils/WebSocketService';

const nuxtApp = useNuxtApp()
nuxtApp.provide('socket', getClientSocket(useRuntimeConfig().public.socketUrl))

</script>
