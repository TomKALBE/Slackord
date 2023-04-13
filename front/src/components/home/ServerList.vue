<script setup lang="ts">
import { ADD_SERVER_MODAL } from "@/tools/modal";
import { onMounted, ref } from "vue";
import { initModals } from "flowbite";
import ServerItem from "@/components/home/ServerItem.vue";
import AddNewServerModal from "@/components/modals/AddNewServerModal.vue";

onMounted(() => {
  initModals();
});

const serverList = [
  {
    bgColor: "orange",
    hasNotification: null,
  },
  {
    bgColor: "green",
    hasNotification: null,
  },
  {
    bgColor: "indigo",
    hasNotification: true,
  },
];
const selectedServer = ref(0);

const setSelectedServer = (index:number) => {
  selectedServer.value = index;
  if (serverList[index].hasNotification)
    serverList[index].hasNotification = false;
  console.log(index);
};
</script>
<template>
  <div class="flex w-8/12 items-center">
    <!-- SECTION Server without notification -->
    <ServerItem
      v-for="(server, index) in serverList"
      v-bind="server"
      :key="index"
      :isSelected="index === selectedServer"
      :setSelectedServer="setSelectedServer"
    />
    <div
      class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300 active:border-4 active:duration-100"
    >
      <div
        :data-modal-target="ADD_SERVER_MODAL"
        :data-modal-toggle="ADD_SERVER_MODAL"
        class="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer border border-gray-400"
      >
        <font-awesome-icon class="h-6 w-6 text-gray-100" :icon="`fa-plus`" />
      </div>
    </div>
    <AddNewServerModal />
  </div>
</template>
