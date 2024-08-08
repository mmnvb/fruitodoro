<script setup>
import FuildAnimation from '../components/FuildAnimation.vue';
</script>

<template>
  <div class="main flex items-center border justify-around">
    <FuildAnimation />
    <div class="text-center pt-3">
      <h2 class="text-5xl">
        Hello world!
      </h2>
      <p class="secondary">
        Secondary text is here!
      </p>
    </div>
  </div>
</template>

<style scoped>
.main{
  background-color: var(--color-background);
  color: var(--color-text-primary);
  width: 500px;
  height: 215px;
}
.secondary{
  color: var(--color-text-secondary);
}
</style>
