<script setup lang="ts">

</script>
<template>
    <div class="flex justify-center scrollbar channel-max-height overflow-y-scroll">
        <div class="flex-col w-11/12 mt-4 space-y-3">
            <div
                class="flex w-full bg-slate-550 rounded-md h-10 items-center justify-between"
            >
                <p class="text-slate-150 ml-8"># Channel 1</p>
                <FontAwesomeIcon
                    data-dropdown-toggle="dropdown"
                    class="w-4 text-gray-300 hover:text-gray-100 cursor-pointer mr-2"
                    icon="fa-gear"
                />
                <div
                    id="dropdown"
                    class="z-50 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-slate-800 border-2 border-slate-600"
                >
                    <ul
                        class="py-2 text-sm text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 font-semibold text-slate-200 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                                >Modifier</a
                            >
                        </li>
                        <li>
                            <a
                                href="#"
                                class="block px-4 py-2 font-semibold text-orange-500 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                                >Supprimer</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex w-full h-10 items-center">
                <p class="text-slate-150 ml-8"># Channel 2</p>
            </div>
            <div class="flex w-full h-10 items-center">
                <p class="text-slate-150 ml-8"># Channel 3</p>
            </div>
            <div class="flex w-full h-10 items-center">
                <p class="text-slate-150 ml-8"># Channel 4</p>
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
