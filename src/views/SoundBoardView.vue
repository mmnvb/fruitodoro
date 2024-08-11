<script setup>
import { ref } from 'vue';

const isClicked = ref(false);
</script>

<template>
  <div class="main rounded-b-lg flex flex-col items-center">
    <h2 class="text-center mt-4">Soundbar is here!</h2>

    <div class="flex flex-wrap items-center w-4/5 h-4/5 gap-3">
      <div 
        class="btn rounded-lg" v-for="i in 6"
        @click="isClicked = !isClicked"
        :class="{'spec': isClicked}"
      >{{ i }}</div>
    </div>
  </div>
</template>

<style scoped>
.main{
  position: absolute;
  z-index: 100;
  width: var(--view-w);
  height: var(--view-h);
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

.btn{
  width: 30%;
  height: 40%;
  border: solid 1px var(--color-border);
}

.btn:hover{
  background-color: var(--color-shadow);
}

.spec{
  border-color: green;
  border-width: 4px;
}
</style>