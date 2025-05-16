<script setup lang="ts">
import PlayIcon from '@/components/icons/PlayIcon.vue'
import PauseIcon from '@/components/icons/PauseIcon.vue'
import  AddIcon from '@/components/icons/AddIcon.vue';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import StopIcon from '@/components/icons/StopIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

import { useTimerStore } from '@/stores/timer';
import { useAudioStore } from '@/stores/audio';
import { TimerState } from "@/types/Timer";
import { computed, ref } from 'vue';

const store = useTimerStore();
const audioStore = useAudioStore();
const isDialog = ref(false);

const currentDisplay = computed(() => {
  const min = Math.floor(store.timer / 60);
  const sec = Math.round(((store.timer / 60) - min) * 60);

  const minArr = min.toFixed().padStart(2, "0").split('');
  const secArr = sec.toFixed().padStart(2, "0").split('');

  return [...minArr, ':', ...secArr];
});

const handleStop = () => {
  audioStore.playClick();
  isDialog.value = true;
}

const rejectStop = () => {
  isDialog.value = false;
  audioStore.playClick();
}

const acceptStop = () => {
  isDialog.value = false;
  store.breakTimer();
  audioStore.playBack();
}
</script>

<template>
  <div 
    class="flex justify-center items-center flex-col pt-3 w-2/4 h-full relative"
  >
    <span 
      class="
      text-sm text-center
      absolute bottom-3 right-3
      select-none sec
      "
    >
      {{ store.timerTitle }} 
      <span v-if="store.workCount > 0">
        -
        {{ store.workCount }}
      </span>
    </span>

    <div class="w-full flex justify-center">
      <h2 
        class="text-6xl w-1/6 select-none text-center overflow-hidden"
        v-for="(digit, index) in currentDisplay"
        :key="index"
      >
        {{ digit }}
      </h2>
    </div>

    <div class="toolbox flex w-3/6 mt-2 flex-col items-center gap-3">
      <div
        v-if="!store.isAlarm && !isDialog"
        class="w-full flex justify-around items-center"
      >
        <PlayIcon
          v-if="store.state != TimerState.Playing"
          @click="store.handlePlay"
        />
        <PauseIcon
          v-else
          @click="store.handlePause"
        />
        <StopIcon @click="handleStop" />
      </div>

      <!-- confirm to stop -->
      <div
        v-if="isDialog && !store.isAlarm"
        class="w-full flex justify-around items-center"
      >
        <CheckIcon @click="acceptStop" />
        <CloseIcon @click="rejectStop" />
      </div>

      <div
        v-if="store.isAlarm"
        class="w-full flex justify-around items-center"
      >
        <LikeIcon @click="store.acceptAlarm" />
        <AddIcon @click="store.postponeAlarm" />
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

.sec{
  color: var(--color-text-secondary);
}
</style>