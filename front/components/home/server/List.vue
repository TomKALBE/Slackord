<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { initModals } from "flowbite";
import useServer from "~/composables/useServer";

const emit = defineEmits(['handleServerChange'])

onMounted(() => {
  initModals();
});

const serverList = [
  {
    bgColor: "gray",
    hasNotification: null,
  },
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
    hasNotification: null,
  },
  {
    bgColor: "amber",
    hasNotification: null,
  },
  {
    bgColor: "rose",
    hasNotification: null,
  },
  {
    bgColor: "blue",
    hasNotification: null,
  },
  {
    bgColor: "blue",
    hasNotification: null,
  },
  {
    bgColor: "rose",
    hasNotification: null,
  },
  {
    bgColor: "rose",
    hasNotification: true,
  },
];
const selectedServer = ref(0);
const { servers } = useServer();
const setSelectedServer = (index:number) => {
    console.log("is selected", index)
  selectedServer.value = index;
  if (serverList[index].hasNotification)
    serverList[index].hasNotification = false;
  emit("handleServerChange", index);
};
</script>
<template>
  <div class="flex w-8/12 items-center overflow-x-scroll no-scrollbar">
    <!-- SECTION Server without notification -->
    <HomeServerItem
      v-for="(server, index) in servers"
      v-bind="server"
      :bgColor="serverList[index].bgColor"
      :key="index"
      :isSelected="index === selectedServer"
      :setSelectedServer="setSelectedServer"
    />
    <ModalServerCreate />
    <div
      class="flex w-12 h-12 ml-2 items-center justify-center rounded-xl hover:border-2 hover:border-spacing-4 hover:border-gray-300 active:border-4 active:duration-100"
    >
      <div
        :data-modal-target="ADD_SERVER_MODAL"
        :data-modal-toggle="ADD_SERVER_MODAL"
        class="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer border border-gray-400"
      >
        <FontAwesomeIcon class="h-6 w-6 text-gray-100" :icon="`fa-plus`" />
      </div>
    </div>
  </div>
</template>
