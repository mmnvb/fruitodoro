<script setup>
import FruitImage from '../components/FruitImage.vue';
import ChangeTheme from '../components/ChangeTheme.vue';
import TimerLayout from '../components/TimerLayout.vue';
import FluidAnimation from '../components/FluidAnimation.vue';

import { ref } from 'vue';

const imgName = ref();
const timerDuration = ref();
const timerState = ref();
const isTimer = ref(false);

const imgUpdate = (e) => {
  imgName.value = e;
}

const onStart = (num) => {
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
}

const onStop = () => {
  isTimer.value = false;
}

</script>

<template>
  <!-- full screen fluid animation -->
  <FluidAnimation
    v-if="isTimer"
    :duration="timerDuration"
    :state="timerState"
  />

  <!-- main -->
  <div class="main flex items-center justify-around rounded-b-lg">
    <!-- left -->
    <div class="w-2/4 h-full flex flex-col mt-2">
      <ChangeTheme @update-img="imgUpdate" />
      <FruitImage
        v-if="imgName"
        :img-name="imgName"
        class="z-10"
      />
    </div>
    <!-- right -->
    <TimerLayout 
      class="mt-4 z-10"
      @on-start="onStart"
      @on-pause="onPause"
      @on-stop="onStop"
    />
  </div>
  
</template>

<style scoped>
.main{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  width: 500px;
  height: 220px;
}
</style>
