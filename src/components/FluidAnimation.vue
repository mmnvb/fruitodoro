<script setup>
const props = defineProps({
  duration:{
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div 
    :style="{ 
      '--animation-duration': `${duration}s`,
      '--animation-state': state 
    }"
    class="container rounded-b-lg"
    @click="console.log(duration, state)"
  />
</template>

<style scoped>
.container {
  overflow: hidden;
  position: absolute;
  width: var(--view-w);
  height: var(--view-h);
  display: flex;
  z-index: 1;
  --animation-duration: 0s; 
  --animation-state: paused;
}

.container::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  animation: fluid var(--animation-duration) linear;
  background-color: var(--color-shadow);
  z-index: 0;
  animation-play-state: var(--animation-state);
}

@keyframes fluid {
  0% {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}

</style>
