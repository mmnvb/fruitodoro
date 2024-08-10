<script setup>
import { ref, computed } from 'vue';
import PlayIcon from './icons/PlayIcon.vue'
import StopIcon from './icons/StopIcon.vue'
import PauseIcon from './icons/PauseIcon.vue'
import CheckIcon from './icons/CheckIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'

// set in seconds 1500 = 25 min
const timer = ref(0);
let myInterval;
const isPaused = ref(true);
const isDialog = ref(false);

const strTime = computed(()=>{
  const min = Math.floor(timer.value / 60);
  const sec = Math.round(((timer.value / 60) - min) * 60);

  return `${min.toFixed().padStart(2, "0")} : ${sec.toFixed().padStart(2, "0")}`;
})

const decrTime = () => {
  if(timer.value > 0){
    timer.value --;
  } else{
    clearInterval(myInterval);
    // make an alarm here
  }
}

const runTimer = (time) => {
  timer.value = time;
  myInterval = setInterval(decrTime, 1000);
}


const startWork = () => {
  isPaused.value = false;
  clearInterval(myInterval);
  const time = timer.value === 0 ? 1500 : timer.value;
  runTimer(time);
}

const pauseTimer = () => {
  isPaused.value = true;
  clearInterval(myInterval);
}

const stopTimer = () => {
  isPaused.value = true;
  clearInterval(myInterval);
  timer.value = 0;
}

const confirmStop = (decision) => {
  if(decision){
    stopTimer();
  } 
  isDialog.value = false;
}

</script>

<template>
  <div 
    class="flex justify-center items-center flex-col pt-3 w-2/4"
  >
    <h2 class="text-6xl w-4/5 select-none text-center">
      {{ strTime }}
    </h2>
    
    <!-- Toolbox -->
    <div class="toolbox flex w-3/6 mt-2">
      <div v-if="!isDialog" class="w-full flex justify-around items-center">
        <PlayIcon v-if="isPaused" @click="startWork"/>
        <PauseIcon v-else @click="pauseTimer" />
        <StopIcon @click="isDialog = true"/>
      </div>
      <!-- confirm to stop -->
      <div v-if="isDialog" class="w-full flex justify-around items-center">
        <CheckIcon @click="confirmStop(true)" />
        <CloseIcon @click="confirmStop(false)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbox > * > *:hover{
  color: var(--color-hover);
}

.toolbox > * > *{
  width: 2rem;
  height: 2rem;
}

</style>