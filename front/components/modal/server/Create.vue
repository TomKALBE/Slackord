<script setup lang="ts">
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import useServer from "~/composables/useServer";
const createServer = ref(false);
const joinServer = ref(false);
const serverName = ref("");
const serverNameError = ref(false);
const { create } = useServer();
const createNewServer = async () => {
    const $modalElement: HTMLElement = document.querySelector('#' + ADD_SERVER_MODAL);
    const modal: ModalInterface = new Modal($modalElement)
    if(serverName.value == "") return serverNameError.value = true;
    serverNameError.value = false;
    createServer.value = !createServer
    try {
        await create({user_id: useAuth().user.value.id, name : serverName.value});
        modal.hide();
    } catch (error) {
        return;
    }
}
const joinNewServer = async () => {
    const $modalElement: HTMLElement = document.querySelector('#' + ADD_SERVER_MODAL);
    const modal: ModalInterface = new Modal($modalElement)
    if(serverName.value == "") return serverNameError.value = true;
    serverNameError.value = false;
    // joinServer.value = !joinServer
    try {
        await SocketService.sendServerMemberRequest(useNuxtApp().$socket,{userId: useAuth().user.value.id, name : serverName.value})
        // modal.hide();
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <div
        :id="ADD_SERVER_MODAL" 
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div
                class="relative rounded-lg shadow bg-slate-800 border-2 border-slate-600"
            >
                <!-- Modal header -->
                <div class="flex p-4 border-b rounded-t border-gray-600">
                    <h3
                        class="text-xl ml-auto mr-auto font-semibold text-white text-center"
                    >
                        {{ createServer ? 'Créer un serveur' : joinServer ? 'Rejoindre un serveur' : 'Créer un serveur'}}
                    </h3>
                    <button
                        type="button"
                        class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 inline-flex items-center hover:bg-gray-600 hover:text-white"
                        :data-modal-hide="ADD_SERVER_MODAL"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <p v-if="!createServer && !joinServer" class="text-base leading-relaxed text-slate-250">
                        Vous pouvez créer ou rejoindre un serveur pour discuter entre amis.
                    </p>
                    <div v-else-if="joinServer">
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du serveur</label>
                        <input v-model="serverName" type="text" id="first_name" class="bg-gray-50 border border-gray-300 dark:bg-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :class="{'border-red-500' : serverNameError, 'dark:border-gray-600' : !serverNameError}" placeholder="Nom du serveur" required>
                        <!-- add error message -->
                        <p class="text-xs text-red-500" v-if="serverNameError">Veuillez entrer un nom de serveur</p>
                    </div>
                    <div v-else>
                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du serveur</label>
                        <input v-model="serverName" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :class="{'border-red-500' : serverNameError, 'dark:border-gray-600' : !serverNameError}" placeholder="Nom du serveur" required>
                        <p class="text-xs text-red-500" v-if="serverNameError">Veuillez entrer un nom de serveur</p>
                    </div>

                </div>
                <!-- Modal footer -->
                <div
                    class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b border-gray-600"
                >
                    <button
                        type="button"
                        class="text-white bg-rose-600 active:bg-rose-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        v-if="!joinServer"
                        @click="createServer ? createNewServer() : createServer = !createServer"
                    >
                        Créer un serveur
                    </button>
                    <button
                        @click="joinServer ? joinNewServer() : joinServer = !joinServer"
                        v-if="!createServer"
                        type="button"
                        class="text-white bg-rose-600 active:bg-rose-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Rejoindre un serveur
                    </button>
                    <button
                        v-if="createServer || joinServer"
                        @click="createServer = false; joinServer = false"
                        type="button"
                        class="text-white bg-gray-600 active:bg-gray-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Annuler
                    </button>
                    <!-- <button
            :data-modal-hide="ADD_SERVER_MODAL"
            type="button"
            class="text-gray-500 indigo bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
          >
            Decline
          </button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<!-- bg-rose-400 -->
