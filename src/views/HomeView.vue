<script setup>
import FruitImage from '../components/FruitImage.vue';
import ChangeTheme from '../components/ChangeTheme.vue';
import TimerLayout from '../components/TimerLayout.vue';
import FluidAnimation from '../components/FluidAnimation.vue';
import SoundBoardView from './SoundBoardView.vue';
import InventoryView from './InventoryView.vue';
import SettingsView from './SettingsView.vue';

import { ref } from 'vue';

const imgName = ref();
const timer = ref();

const timerDuration = ref();
const timerState = ref();
const isTimer = ref(false);
const isPaused = ref(true);
const tabName = defineModel({default: 'home'});

const imgUpdate = (e) => {
  imgName.value = e;
}

const onStart = (num) => {
  isPaused.value = false;
  if(num){
    timerDuration.value = num;
    timerState.value = 'running';
    isTimer.value = true;
    return
  }

  isTimer.value = true;
  timerState.value = 'running';
}

const onPause = () => {
  timerState.value = 'paused';
  isPaused.value = true;
}

const onStop = () => {
  isTimer.value = false;
  isPaused.value = true;
}

const togglePause = () => {
  if(isPaused.value){
    timer.value.pauseTimer();
    return
  }

  timer.value.startTimer();
}

</script>

<template>
  <!-- full screen fluid animation -->
  <FluidAnimation
    v-if="isTimer"
    :duration="timerDuration"
    :state="timerState"
  />
  <!-- Tabs -->
  <SoundBoardView :class="{'hidden': tabName!='disc'}"/>
  <InventoryView :class="{'hidden': tabName!='inventory'}"/>
  <SettingsView :class="{'hidden': tabName!='settings'}"/>

  <!-- main -->
  <div 
    class="
    main flex items-center
    justify-around rounded-b-lg
    relative
    "
  >
    <!-- left -->
    <div class="w-2/4 h-full flex flex-col">
      <ChangeTheme @update-img="imgUpdate" />
      <FruitImage
        v-if="imgName"
        :img-name="imgName"
        class="z-10 mt-4"
        @on-toggle="togglePause"
        v-model="isPaused"
      />
    </div>
    <!-- right -->
    <TimerLayout 
      class="mt-4 z-10"
      @on-start="onStart"
      @on-pause="onPause"
      @on-stop="onStop"
      ref="timer"
    />
  </div>
  
</template>

<style scoped>
.main{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  width: var(--view-w);
  height: var(--view-h);
}
</style>
