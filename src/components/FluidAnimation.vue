<script setup lang="ts">
import { TimerState } from "@/types/Timer";
import { useTimerStore } from '@/stores/timer';

const store = useTimerStore();
</script>

<template>
  <div
    :key="store.startTime"
    :style="{ 
      '--animation-duration': `${store.startTime}s`,
      '--animation-state': store.state == TimerState.Playing ? 'playing' : 'paused'
    }"
    class="container rounded-b-lg"
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
