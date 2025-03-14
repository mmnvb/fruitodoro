<script setup lang="ts">


// const strTime = computed(()=>{
//   let min = Math.floor(timer.value / 60);
//   let sec = Math.round(((timer.value / 60) - min) * 60);

//   min = min.toFixed().padStart(2, "0").split('');
//   sec = sec.toFixed().padStart(2, "0").split('');

//   return [...min,':',...sec];
// });
</script>

<template>
  <div 
    class="flex justify-center items-center flex-col pt-3 w-2/4 h-full relative"
  > 
    under work...
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