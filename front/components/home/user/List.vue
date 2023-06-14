<script setup lang="ts">
const { users } = useUser();
const { user } = useAuth();
const friendRequests = ref<IRelationship[]>([]);

const emit = defineEmits(["handleConversationChange"]);
const selectedConversation = ref(0);

const setSelectedUser = (index: number) => {
    selectedConversation.value = index;
    emit("handleConversationChange",index);
};

onMounted(async () => {
});
</script>
<template>
    <div class="flex justify-center scrollbar channel-max-height overflow-y-scroll">
        <div class="flex-col w-11/12 mt-4 space-y-3">
            <div class="flex w-full h-10 items-center justify-between hover:bg-slate-450 rounded-md cursor-pointer"
                :class="{ 'bg-slate-550': -1 === selectedConversation }"
                @click="setSelectedUser(-1)"
                >
                <div class="flex items-center justify-start">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center ml-6"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                    <p class="text-slate-150 ml-3">Demande d'ami</p>
                </div>
            </div>
            <div
                v-if="users"
                v-for="(user, index) in users"
                class="flex w-full h-10 items-center justify-between hover:bg-slate-450 rounded-md cursor-pointer"
                :class="{ 'bg-slate-550': index === selectedConversation }"
                @click="setSelectedUser(index)"
            >
                <div class="flex items-center justify-start">
                    <div
                        class="flex w-8 h-8 rounded-full bg-slate-500 justify-center items-center ml-6"
                    >
                        <FontAwesomeIcon
                            class="h-4 w-4 text-white"
                            :icon="['far', 'user']"
                        />
                    </div>
                    <p class="text-slate-150 ml-3">{{ user?.pseudo }}</p>
                </div>
                <template v-if="index === selectedConversation">
                    <FontAwesomeIcon
                        data-dropdown-toggle="dropdown"
                        class="w-4 text-gray-300 hover:text-gray-100 cursor-pointer mr-2"
                        icon="fa-gear"
                    />
                </template>
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
