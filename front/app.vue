<script setup>
import useServer from './composables/useServer';
import getClientSocket from './utils/WebSocketService';

const nuxtApp = useNuxtApp()


const { autoLogin } = useAuth();

onMounted(async () => {
  nuxtApp.provide('socket', getClientSocket(useRuntimeConfig().public.socketUrl))
  await autoLogin();
  await useServer().get();
})

</script>
<template>
  <div class="main h-screen w-screen flex justify-center items-center bg-slate-650">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  filter: opacity(0);
}
</style>
