<template>
  <div
    class="h-screen w-screen flex flex-col bg-slate-700 justify-center items-center"
  >
    <img class="w-32 h-auto" src="https://zombo.com/images/zombocom.png" />
  </div>
</template>
<style scoped>
.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes grow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

img {
  animation: grow 1s infinite alternate;
}
</style>
