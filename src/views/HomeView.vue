<script setup>
import FruitImage from '../components/FruitImage.vue';
import ChangeTheme from '../components/ChangeTheme.vue';
import TimerLayout from '../components/TimerLayout.vue';
import FluidAnimation from '../components/FluidAnimation.vue';

import { ref } from 'vue';

const imgName = ref();

const imgUpdate = (e) => {
  imgName.value = e;
}
</script>

<template>
  <FluidAnimation />

  <div class="main flex items-center justify-around rounded-b-lg">
    <div class="w-2/4 h-full flex flex-col mt-2">
      <ChangeTheme @update-img="imgUpdate" />
      <FruitImage
        v-if="imgName"
        :img-name="imgName"
        class="z-10"
      />
    </div>
    <TimerLayout class="mt-4 z-10"/>
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
