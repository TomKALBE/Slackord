<script setup lang="ts">
type Props = {
  isSelected: boolean;
  hasNotification?: boolean | null;
  bgColor: string;
  setSelectedServer: Function;
};
defineProps<Props>();
const key = getCurrentInstance()?.vnode.key;
</script>
<template>
    <div class="flex items-center justify-center">
        <div
          @click="setSelectedServer(key), useServer().setSelectedServer(key)"
          class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300 active:border-4 active:duration-100"
        >
          <div
            class="w-10 h-10 rounded-lg cursor-pointer relative"
            :class="'bg-' + bgColor + '-400'"
          >
            <div
              v-show="hasNotification"
              class="w-4 h-4 absolute bg-slate-100 border-2 border-slate-800 rounded-full right-[-0.375rem] top-[-0.375rem]"
            ></div>
          </div>
          <div
            v-show="isSelected"
            class="w-6 h-2 rounded-lg bg-slate-200 absolute -top-1"
          ></div>
        </div>
        <div v-if="key === 0" class="w-1 h-10 rounded bg-slate-700 ml-2">
      
        </div>
    </div>
</template>
<style scoped>
/* 
bg-green-400
bg-indigo-400
bg-orange-400
bg-amber-400
bg-blue-400
bg-red-400
*/
</style>