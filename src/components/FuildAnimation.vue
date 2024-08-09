<script setup>
defineProps({
  imgName: {
    type: String,
    required: true
  }
});

</script>

<template>
  <img 
    :src="`/img/${imgName}`"
    alt="icon"
    class="w-1/3 hover:scale-105 transition hover:rotate-12"
  >
  <!-- <PlumIcon class="w-1/3" /> -->
</template>

<style scoped>
</style>