<template>
  <div class="container rounded-b-lg" />
</template>

<script setup>
// No script needed for this CSS-only animation
</script>

<style scoped>
.container {
  overflow: hidden;
  position: absolute;
  width: 500px;
  height: 220px;
  display: flex;
  z-index: 1;
}

.container::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  animation: fluid 10s linear infinite;
  background-color: var(--color-shadow);
  z-index: 0;
}

@keyframes fluid {
  0% {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}

</style>
