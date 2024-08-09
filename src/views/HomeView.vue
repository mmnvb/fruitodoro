<script setup>
import FuildAnimation from '../components/FuildAnimation.vue';
import ChangeTheme from '../components/ChangeTheme.vue';
import TimerLayout from '../components/TimerLayout.vue';

import { ref } from 'vue';

const imgName = ref();

const imgUpdate = (e) => {
  imgName.value = e;
}
</script>

<template>
  <div class="main flex items-center border justify-around">
    <ChangeTheme @update-img="imgUpdate"/>
    <FuildAnimation :imgName="imgName"/>
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
