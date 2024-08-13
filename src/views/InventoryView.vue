<script setup>
import FruitCard from '../components/FruitCard.vue';
import { onMounted, ref } from 'vue';

const fruits = ref(null);

const refresh = () => {
  fruits.value = JSON.parse(localStorage.getItem('inventory'));
}

onMounted(()=>{
  refresh();
})
</script>

<template>
  <div class="
    main rounded-b-lg flex flex-col items-center select-none
    ">
    <h1 class="text-center mt-4 text-xl">Inventory</h1>

    <div
      class="
        flex flex-wrap w-4/5 items-center gap-3
        mt-2
        "
      v-if="fruits"
    >
      <FruitCard 
        v-for="item in fruits"
        :key="item.img"
        :imgName="item.img"
        :quantity="item.count"
      />
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
</style>