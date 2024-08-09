<script setup>
import FruitImage from '../components/FruitImage.vue';
import ChangeTheme from '../components/ChangeTheme.vue';
import TimerLayout from '../components/TimerLayout.vue';

import { ref } from 'vue';

const imgName = ref();

const imgUpdate = (e) => {
  imgName.value = e;
}
</script>

<template>
  <div class="main flex items-center justify-around">
    <div class="w-2/4 h-full flex flex-col">
      <ChangeTheme @update-img="imgUpdate" />
      <FruitImage
        v-if="imgName"
        :img-name="imgName"
      />
    </div>
    <TimerLayout />
  </div>
</template>

<style scoped>
.main{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  width: 500px;
  height: 215px;
}
</style>
