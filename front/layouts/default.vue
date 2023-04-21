<script setup lang="ts">
const toasts = useState<IToast[]>("toasts");
onMounted(() => {
    useToast().add({
        color: "emerald",
        message: "Bienvenue sur ZomboCom",
        icon: "circle-check",
    });
});
</script>
<template>
    <div>
        <Toast
            :icon="toasts[0].icon"
            :message="toasts[0].message"
            :color="toasts[0].color"
            v-if="toasts && toasts[0]"
        />
        <slot> </slot>
    </div>
</template>
