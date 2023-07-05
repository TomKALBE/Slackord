<script setup lang="ts">
import { initModals, initDropdowns } from "flowbite";
import useServer from "~/composables/useServer";

const currentServer = ref(0);
const currentConversation = ref(0);

const { users, friendRequests, getRelatedUsers, getFriendRequests } = useUser();
const { user, updateStatus } = useAuth();
const { servers } = useServer();
onMounted(async () => {
    setTimeout(async () => {
        // setChatScrollBarBottom();
        initDropdowns();
        initModals();
        getRelatedUsers();
        getFriendRequests();
    }, 10);
});

const logout = () => {
    useAuth().logout();
};
watch(
    () => useServer().selectedServer.value,
    () => {
        currentServer.value = useServer().selectedServer.value;
    }
);
const handleServerChange = (server: number) => {
    currentServer.value = server;
};
const handleConversationChange = (conversation: number) => {
    currentConversation.value = conversation;
};
const numberOfFriendRequests = computed(() => {
    return friendRequests.value.filter(
        (friendRequest) => friendRequest.request_status === "PENDING"
    ).length;
});
</script>
<template>
    <div class="h-screen w-screen flex flex-col">
        <!-- SECTION Server Part -->
        <div class="flex w-100 h-16 bg-slate-300">
            <div class="flex w-3/4 bg-slate-800 items-center">
                <!-- SECTION Server List -->
                <HomeServerList
                    @handleServerChange="(server) => handleServerChange(server)"
                />
                <!-- !SECTION Server List-->
                <!-- SECTION SearchBar -->
                <div class="flex w-4/12 items-center justify-center relative">
                    <FontAwesomeIcon
                        class="h-4 w-4 text-slate-300 absolute xl:left-24 lg:left-16 md:left-6 left-4"
                        icon="magnifying-glass"
                    />
                    <input
                        class="w-10/12 text-center text-white bg-slate-700 border focus:outline-none border-slate-400 placeholder:text-slate-300 rounded-md"
                        placeholder="Find someone"
                    />
                </div>
                <!-- !SECTION SearchBar-->
            </div>
            <!-- SECTION Profile part-->
            <div
                class="flex group w-1/4 h-full bg-slate-700 items-center border-l-2 border-gray-400"
            >
                <div
                    data-dropdown-toggle="profilDropdown2"
                    data-dropdown-placement="bottom"
                    class="w-auto flex justify-center items-center"
                >
                    <div
                        class="flex w-12 h-12 rounded-full border-2 cursor-pointer bg-gray-400 mx-2 justify-center items-center relative"
                    >
                        <FontAwesomeIcon
                            class="h-6 w-6 text-white"
                            :icon="['far', 'user']"
                        />
                        <div
                            class="w-3 h-3 absolute bottom-[-0.125rem] left-[-0.125rem] rounded-full"
                            :class="{ 'bg-red-400': user?.state === 'DO NOT DISTURB', 'bg-green-400': user?.state === 'ONLINE','bg-gray-400' : user?.state === 'INVISIBLE' }"
                        ></div>
                        <div
                            class="animate-ping w-3 h-3 absolute bottom-[-0.125rem] left-[-0.125rem] rounded-full"
                            :class="{ 'bg-red-400': user?.state === 'DO NOT DISTURB', 'bg-green-400': user?.state === 'ONLINE','bg-gray-400' : user?.state === 'INVISIBLE' }"

                            ></div>
                    </div>
                    <div class="flex-1 mr-1">
                        <p
                            class="text-white group-hover:border-b-2 cursor-pointer inline-block"
                        >
                            {{ useAuth().user.value?.pseudo }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="profilDropdown2"
            class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-48 bg-slate-800 border-2 border-slate-600"
        >
            <ul
                class="py-2 text-sm text-gray-200"
                aria-labelledby="profilDropdown"
            >
                <li
                    class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                    data-dropdown-toggle="dropdownUserStatus"
                    data-dropdown-placement="left"
                    data-dropdown-trigger="hover"
                    data-dropdown-delay="100"
                >
                    <FontAwesomeIcon class="w-auto mr-3" icon="chevron-left" />
                    <div class="flex items-center">
                        <a
                            href="#"
                            class="flex ml-1 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"

                            >{{user?.state === 'DO NOT DISTURB' ? 'Ne pas déranger' : user?.state === 'ONLINE' ? 'En ligne' : 'Invisible'}}</a
                        >
                        <span
                            class="ml-2 w-3 h-3 mt-[3px] rounded-full"
                            :class="{ 'bg-red-400': user?.state === 'DO NOT DISTURB', 'bg-green-400': user?.state === 'ONLINE','bg-gray-400' : user?.state === 'INVISIBLE' }"
                        ></span>
                    </div>
                    <div
                        id="dropdownUserStatus"
                        class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-slate-800 border-2 border-slate-600"
                    >
                        <ul
                            class="py-2 text-sm text-gray-200"
                            aria-labelledby="dropdownUserStatus"
                        >
                            <li
                                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                @click="updateStatus('ONLINE')"
                            >
                                <span
                                    class="w-3 h-3 bg-green-400 rounded-full"
                                ></span>
                                <a
                                    href="#"
                                    class="ml-2 font-semibold text-slate-200"
                                    >En ligne</a
                                >
                            </li>
                            <li
                                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                data-dropdown-toggle="dropdownUserStatus"
                                data-dropdown-target="dropdownUserStatus"
                            >
                                <span
                                    class="w-3 h-3 bg-yellow-400 rounded-full"
                                ></span>
                                <div
                                    class="flex ml-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                                >
                                    Inactif
                                </div>
                            </li>
                            <li
                                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                @click="updateStatus('DO NOT DISTURB')"
                            >
                                <span
                                    class="w-3 h-3 bg-red-400 rounded-full"
                                ></span>
                                <a
                                    href="#"
                                    class="flex ml-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                                    
                                    >Ne pas déranger</a
                                >
                            </li>
                            <li
                                class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                @click="updateStatus('INVISIBLE')"
                            >
                                <span
                                    class="w-3 h-3 bg-gray-400 rounded-full"
                                ></span>
                                <a
                                    href="#"
                                    class="flex ml-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                                    >Invisible</a
                                >
                            </li>
                        </ul>
                    </div>
                </li>
                <li
                    class="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                >
                    <FontAwesomeIcon
                        icon="sign-out"
                        class="w-auto mr-3 rotate-180"
                    />
                    <a
                        @click="logout()"
                        class="flex font-semibold text-orange-500"
                        >Se déconnecter</a
                    >
                </li>
            </ul>
        </div>

        <!-- !SECTION Server Part-->
        <!-- SECTION Channel Part -->
        <div class="flex-1 flex">
            <div
                class="lg:w-3/12 w-4/12 bg-slate-700 border-r-2 border-t-2 border-slate-800"
            >
                <ModalServerInfo />
                <!-- SECTION Header -->
                <template v-if="currentServer.serverId">
                    <div
                        class="w-full h-14 flex items-center border-b-2 border-slate-800"
                    >
                        <div
                            class="ml-4 flex w-full items-center justify-around"
                        >
                            <div
                                class="inline-flex items-center p-2 hover:bg-slate-550 hover:rounded cursor-pointer"
                                @click="handleClick"
                                :data-modal-target="MODIFY_SERVER_MODAL"
                                :data-modal-toggle="MODIFY_SERVER_MODAL"
                            >
                                <p class="text-xl text-white">{{ currentServer.server?.name }}</p>
                                <FontAwesomeIcon
                                    class="w-4 text-gray-100 ml-2"
                                    :icon="`fa-chevron-down`"
                                />
                            </div>
                            <div
                                id="mon-bouton"
                                class="flex items-center justify-center hover:bg-slate-550 hover:rounded-full cursor-pointer w-10 h-10"
                            >
                                <FontAwesomeIcon
                                    class="w-5 h-5 text-white"
                                    :icon="['far', 'bell']"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- !SECTION Header-->
                    <!-- SECTION Channel list -->
                    <HomeChannelList />
                    <!-- !SECTION Channel list-->
                </template>
                <template v-else>
                    <div
                        class="w-full h-14 flex items-center border-b-2 border-slate-800"
                    >
                        <div
                            class="ml-4 flex w-full items-center justify-around"
                        >
                            <div
                                class="inline-flex items-center p-2 hover:bg-slate-550 hover:rounded cursor-pointer"
                            >
                                <p class="text-xl text-white">
                                    Messages privés
                                </p>
                            </div>
                            <div
                                id="mon-bouton"
                                class="flex items-center justify-center hover:bg-slate-550 hover:rounded-full cursor-pointer w-10 h-10"
                            >
                                <FontAwesomeIcon
                                    class="w-5 h-5 text-white"
                                    :icon="['fa', 'plus']"
                                />
                            </div>
                        </div>
                    </div>
                    <HomeUserList
                        @handleConversationChange="
                            (conversation) =>
                                handleConversationChange(conversation)
                        "
                    />
                </template>
            </div>
            <!-- SECTION Chat Part -->
            <div
                class="flex flex-col lg:w-9/12 w-8/12 bg-slate-650 border-t-2 border-slate-800"
            >
                <!-- SECTION Channel info -->

                <div
                    v-if="currentServer?.serverId"
                    class="flex w-full h-14 border-b-2 border-slate-800 items-center justify-between"
                >
                    <p class="ml-6 text-xl text-white"># {{ useChannel().selectedChannel.value.name }}</p>
                    <div class="mr-6">
                        <FontAwesomeIcon
                            class="w-5 h-5 text-slate-150 mr-4"
                            :icon="['fa', 'bell']"
                        />
                        <FontAwesomeIcon
                            class="w-5 h-5 text-slate-150"
                            :icon="['fa', 'user-group']"
                        />
                    </div>
                </div>
                <div
                    v-else-if="currentConversation >= 0"
                    class="flex w-full h-14 border-b-2 border-slate-800 items-center justify-between"
                >
                    <p class="ml-6 text-xl text-white">
                        @ {{ users[currentConversation]?.pseudo }}
                    </p>
                </div>
                <div
                    v-else
                    class="flex w-full h-14 border-b-2 border-slate-800 items-center justify-start"
                >
                    <div
                        class="flex items-center justify-center w-4 h-4 ml-6 text-xs font-semibold text-white bg-red-500 rounded-full"
                    >
                        <p>{{ numberOfFriendRequests }}</p>
                    </div>
                    <div class="text-slate-200 ml-3">
                        Nouvelle{{ numberOfFriendRequests > 1 ? "s" : "" }} demande{{ numberOfFriendRequests > 1 ? "s" : "" }} d'ami
                    </div>
                </div>

                <!-- !SECTION Channel info-->
                <!-- SECTION Chat -->
                <HomeMessageList
                    v-if="currentServer?.serverId"
                    :privateConversation="false"
                    :user="useChannel().selectedChannel.value"
                    :channel="useChannel().selectedChannel.value"/>
                <HomeMessageList
                    v-else-if="currentConversation >= 0"
                    :user="users[currentConversation]"
                    :privateConversation="true"
                />
                <HomeUserFriendRequestList
                    v-else
                    :friend-requests="friendRequests"
                />
                <!-- !SECTION Chat -->
            </div>
            <!-- !SECTION  -->
        </div>

        <!-- !SECTION Channel Part-->
        <!-- SECTION Server add Modal -->
        <!-- !SECTION Server add Modal -->
    </div>
</template>
<style scoped>
.chat-max-height {
    max-height: calc(100vh - 2.5rem - 3.5rem - 4rem - 4rem);
}
</style>
