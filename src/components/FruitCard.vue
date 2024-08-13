<script setup>
defineProps({
  img: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="card relative rounded">
    <img :src="`/img/${img}`" 
      class="transition"
    >
    <div>
      <h3 
        class="chip absolute -right-1 -bottom-2 rounded w-6 text-center"
      >
        x{{ quantity }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.card{
  width: 70px;
  height: 70px;
  border: solid 2px var(--color-primary);
}

.card img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.chip{
  background-color: var(--color-primary);
  color: var(--color-surface);
}

.card:hover img{
  transform: rotate(-15deg);
  transition: all .3 ease;
}

</style>