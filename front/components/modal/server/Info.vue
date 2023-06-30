<script setup lang="ts">
const serverName = ref("");
const serverNameError = ref(false);
const closeButton = ref(null);

watch(
    () => useServer().selectedServer.value,
    () => {
        serverName.value = useServer().selectedServer.value.server.name
    }
)

const modifyServer = async () => {
    try {
        if (serverName.value == "") {
            serverNameError.value = true;
            throw new Error()
        }
        serverNameError.value = false;

        const res = await SocketService.sendNewServerSettings(useNuxtApp().$socket, { id: useServer().selectedServer.value.server.id, name: serverName.value, user_id: useServer().selectedServer.value.server.userId })
        console.log(res)


        const newServer = useServer().selectedServer.value;
        newServer.server.name = serverName.value;
        useServer().modifyServer(newServer)
        closeButton.value.click()
        useToast().add({ icon: "circle-check", color: "green", message: "Le serveur a bien été modifié" });


    } catch (error) {
        console.log(error)
        useToast().add({ icon: "circle-exclamation", color: "red", message: "Une erreur est survenue lors de la modification du serveur" });
    }
}

const deleteServer = () => {
    if (confirm('Vous êtes sur point de supprimer le serveur, êtes vous sûr ?')) {
        closeButton.value.click()
    }
}
</script>
<template>
    <div :id="MODIFY_SERVER_MODAL" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative rounded-lg shadow bg-slate-800 border-slate-600">
                <button ref="closeButton" type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    :data-modal-hide="MODIFY_SERVER_MODAL">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Modifier le serveur
                    </h3>
                    <form class="flex-col items-start justify-start" @submit.prevent="modifyServer()">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du
                                server</label>
                            <input v-model="serverName" type="text" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
                                :class="{ 'border-red-500': serverNameError, 'dark:border-gray-600': !serverNameError }"
                                placeholder="Nom du channel" required />
                            <p class="text-xs text-red-500" v-if="serverNameError">Veuillez entrer un nom de serveur</p>
                        </div>
                        <div class="pt-5">
                            <small @click="deleteServer()"
                                class="text-rose-600 cursor-pointer hover:border-b hover:border-b-rose-600">Supprimer le
                                serveur</small>
                        </div>
                        <div class="pt-3">
                            <button @click="modifyServer()" type="button"
                                class="text-white bg-rose-600 active:bg-rose-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Modifier
                            </button>
                            <button :data-modal-hide="MODIFY_SERVER_MODAL" type="button"
                                class="ml-4 text-white bg-gray-600 active:bg-gray-700 duration-300 hover:scale-105 tran focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
