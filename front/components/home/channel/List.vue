<script setup lang="ts">
import { Dropdown, initDropdowns, initModals } from "flowbite";

onMounted(async () => {
    setTimeout(async () => {
        // setChatScrollBarBottom();
        initModals();
        get();
        initDropdowns();
    }, 10);
});
watch(
    () => useServer().selectedServer.value,
    async () => {
        get();
    }
);
const { channels, get } = useChannel();
const openDropdown = (id: number) => {
    const dropdown = document.getElementById('dropdown' + id);
    const dropdownButton = document.getElementById('dropdownbutton' + id);
    const _dropdown = new Dropdown(dropdown, dropdownButton, null);
    if (_dropdown.isVisible()) return;
    dropdown.classList.remove('hidden');
}
const modifyButton = ref()
const triggerModify = () => {
    modifyButton.value.click()
}

const deleteChannel = () => {
    if(confirm('Vous êtes sur point de supprimer le channel, êtes vous sûr ?')){
        useChannel().deleteChannel(useChannel().selectedChannel.value)
    }
}
</script>
<template>
    <div class="flex justify-center scrollbar channel-max-height overflow-y-scroll">
        <ModalChannelCreate />
        <ModalChannelModify />
        <div class="flex-col w-11/12 mt-4 space-y-3">
            <template v-for="(channel, index) in channels" :key="channel.id">
                <div v-if="useChannel().selectedChannel.value?.id == channel.id"
                    class="flex w-full bg-slate-550 rounded-md h-10 items-center justify-between">
                    <p class="text-slate-150 ml-8"># {{ channel.name }}</p>
                    <FontAwesomeIcon v-if="useServer().selectedServer.value.server.userId == useAuth().user.value?.id"
                        :data-dropdown-toggle="'dropdown' + channel.id" :id="'dropdownbutton' + channel.id" data-drop
                        class="w-4 text-gray-300 hover:text-gray-100 cursor-pointer mr-2" icon="fa-gear"
                        @click="openDropdown(channel.id)" />
                    <div :id="'dropdown' + channel.id"
                        class="z-50 divide-y hidden divide-gray-100 rounded-lg shadow w-44 bg-slate-800 border-2 border-slate-600">
                        <ul class="py-2 text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li :data-modal-target="MODIFY_CHANNEL_MODAL" :data-modal-toggle="MODIFY_CHANNEL_MODAL"
                                @click="triggerModify()">
                                <a :data-modal-target="MODIFY_CHANNEL_MODAL" :data-modal-toggle="MODIFY_CHANNEL_MODAL"
                                    class="block px-4 py-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white">Modifier</a>
                            </li>
                            <li @click="deleteChannel()">
                                <a
                                    class="block px-4 py-2 font-semibold text-orange-500 hover:bg-gray-100 hover:bg-gray-600">Supprimer</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-else class="group flex w-full h-10 items-center cursor-pointer hover:bg-slate-600 rounded-md"
                    @click="useChannel().setSelectedChannel({ ...channel })">
                    <p class="text-slate-150 ml-8 group-hover:text-white">
                        # {{ channel.name }}
                    </p>
                </div>
            </template>
            <div :data-modal-target="MODIFY_CHANNEL_MODAL" :data-modal-toggle="MODIFY_CHANNEL_MODAL" class="hidden"
                ref="modifyButton">
            </div>
            <div v-if="useServer().selectedServer.value.server.userId == useAuth().user.value?.id"
                :data-modal-target="CREATE_CHANNEL_MODAL" :data-modal-toggle="CREATE_CHANNEL_MODAL"
                class="group flex w-full h-10 items-center justify-center opacity-70 hover:opacity-100 active:bg-slate-550 bg-slate-750 rounded cursor-pointer hover:bg-slate-650">
                <FontAwesomeIcon icon="fa-plus" class="text-white" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.channel-max-height {
    max-height: calc(100vh - 2.5rem - 3.5rem - 2rem);
    min-height: calc(100vh - 2.5rem - 3.5rem - 2rem);
}

.scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
}
</style>
