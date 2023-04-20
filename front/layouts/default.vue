<script setup>
const notification = ref(false)

onMounted(() => {
})

watch(useState('user'), (newVal) => {
    console.log('coucou',newVal.isAuthenticated)
    if(newVal.isAuthenticated){
        notification.value = true
        setTimeout(() => {
            notification.value = false
        }, 5000);
    }else{
        notification.value = true
        setTimeout(() => {
            notification.value = false
        }, 5000);
    }
})
</script>
<template>
    <div>
        <Toast color="emerald" v-if="notification"/>
        <slot>

        </slot>
    </div>
</template>