<script setup lang="ts">
defineProps({
  imgName: {
    type: String,
    required: true
  }
});

import { useTimerStore } from '@/stores/timer';
import { TimerState } from "@/types/Timer";

const store = useTimerStore();

const togglePause = () => {
  if(store.state == TimerState.Playing) {
    store.handlePause();
    return;
  }
  
  store.handlePlay();
}
</script>

<template>
  <div class="overflow-hidden mt-2 h-fit select-none">
    <img 
      :src="`/img/${imgName}`"
      alt="icon"
      class="
      img transition
      scale-105 hover:scale-110
      hover:rotate-12
      box
      "
      @click="togglePause"
    >
  </div>
  <!-- <PlumIcon class="w-1/3" /> -->
</template>

<style scoped>
.img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* animation: activeState 3s ease-in-out infinite; */
}

@keyframes activeState {
  0%{
    transform: rotate(30deg);
  }
  50%{
    transform: rotate(-30deg); 
  }
  100%{
    transform: rotate(30deg);
  }
}
</style>